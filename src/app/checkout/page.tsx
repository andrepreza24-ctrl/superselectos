"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import jsPDF from "jspdf";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_lj9t6ss";
const EMAILJS_TEMPLATE_ID = "template_4s7evlc";
const EMAILJS_PUBLIC_KEY = "WpiwIs51JXpE-x7gN";

export default function CheckoutPage() {
  // datos del carrito 
  const { carrito, total, vaciarCarrito } = useCart();

  // usuario que tiene la sesion iniciada actualmente
  const { usuarioActual } = useAuth();

  const router = useRouter();

  const [procesando, setProcesando] = useState(false);

  if (!usuarioActual) {// autentificaciones
    return (
      <div className="text-center py-5">
        <h3>Debes iniciar sesion para finalizar la compra</h3>
        <button className="btn btn-primary mt-3" onClick={() => router.push("/login")}>
          Iniciar sesion
        </button>
      </div>
    );
  }

  if (carrito.length === 0) {
    return (
      <div className="text-center py-5">
        <h3>Tu carrito esta vacio</h3>
      </div>
    );
  }

  // genera el pdf de la factura usando jsPDF y devuelve tambien el numero
  // y la fecha de la factura 
  function generarFactura() {
    const doc = new jsPDF();

    const numeroFactura = Math.floor(Math.random() * 900000) + 100000;
    const fecha = new Date().toLocaleString();

    doc.setFontSize(16);
    doc.text("Super Selectos - Factura de Compra", 10, 15);

    // Datos generales de la factura y del cliente
    doc.setFontSize(11);
    doc.text(`Factura N: ${numeroFactura}`, 10, 28);
    doc.text(`Fecha: ${fecha}`, 10, 35);
    doc.text(`Cliente: ${usuarioActual!.nombre}`, 10, 42);
    doc.text(`Correo: ${usuarioActual!.correo}`, 10, 49);

    // Encabezados de la tabla de productos
    let y = 62;
    doc.text("Producto", 10, y);
    doc.text("Cant.", 110, y);
    doc.text("Precio", 140, y);
    doc.text("Subtotal", 170, y);
    y += 8;

    carrito.forEach((item) => {
      doc.text(item.titulo, 10, y);
      doc.text(String(item.cantidad), 110, y);
      doc.text(`$${item.precio.toFixed(2)}`, 140, y);
      doc.text(`$${(item.precio * item.cantidad).toFixed(2)}`, 170, y);
      y += 8; 
    });

    y += 6;
    doc.setFontSize(13);
    doc.text(`Total: $${total.toFixed(2)}`, 10, y);

    return { doc, numeroFactura, fecha };
  }

  // listado de productos comprados,
  function construirDetalleProductos() {
    return carrito
      .map(
        (item) =>
          `${item.titulo}  x${item.cantidad}  -  $${(item.precio * item.cantidad).toFixed(2)}`
      )
      .join("\n");
  }

  // envia el correo con los datos de la factura usando EmailJS.
  // "parametros" son los valores que van a reemplazar las variables
  async function enviarCorreoFactura(numeroFactura: number, fecha: string) {
    const parametros = {
      nombre_cliente: usuarioActual!.nombre,
      correo_cliente: usuarioActual!.correo,
      numero_factura: numeroFactura,
      fecha_factura: fecha,
      total_factura: total.toFixed(2),
      detalle_productos: construirDetalleProductos(),
    };

    // emailjs.send hace la peticion real al servicio de EmailJS
    // que se encarga de mandar el correo desde la cuenta de Gmail conectada
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      parametros,
      EMAILJS_PUBLIC_KEY
    );
  }

  // Se ejecuta cuando el usuario da clic en "Confirmar y Generar Factura"
  async function confirmarCompra() {
    setProcesando(true); // muestra procesando...

    // genera el PDF de la factura
    const { doc, numeroFactura, fecha } = generarFactura();

    // guarda un registro de la factura en localStorage (historial simulado)
    const factura = {
      numero: numeroFactura,
      fecha,
      cliente: usuarioActual!.nombre,
      correo: usuarioActual!.correo,
      productos: carrito,
      total,
    };

    const historial = JSON.parse(localStorage.getItem("facturas") || "[]");
    historial.push(factura);
    localStorage.setItem("facturas", JSON.stringify(historial));

    // descarga el PDF automaticamente en la computadora del usuario
    doc.save(`factura-${numeroFactura}.pdf`);

    // intenta enviar el correo con el detalle de la factura
    try {
      await enviarCorreoFactura(numeroFactura, fecha);
      toast.success(`Factura enviada a ${usuarioActual!.correo}`);
    } catch (error) {
      // Si el envio falla (por ejemplo, sin internet), la compra igual se completa,
      // solo se avisa que el correo no pudo enviarse
      console.error(error);
      toast.error("La factura se genero pero no se pudo enviar el correo");
    }

    // vacia el carrito y redirige a la pagina de compra exitosa
    vaciarCarrito();
    setProcesando(false);
    router.push("/checkout/success");
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <h2 className="mb-4">Confirmar Compra</h2>

        {/* Datos del cliente que va a recibir la factura */}
        <div className="card mb-4">
          <div className="card-body">
            <p><strong>Cliente:</strong> {usuarioActual.nombre}</p>
            <p><strong>Correo:</strong> {usuarioActual.correo}</p>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Resumen del pedido</h5>
            {carrito.map((item) => (
              <div className="d-flex justify-content-between" key={item.id}>
                <span>{item.titulo} x{item.cantidad}</span>
                <span>${(item.precio * item.cantidad).toFixed(2)}</span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between">
              <strong>Total</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>
          </div>
        </div>

        <button
          className="btn btn-success w-100"
          onClick={confirmarCompra}
          disabled={procesando}
        >
          {procesando ? "Procesando..." : "Confirmar y Generar Factura"}
        </button>
      </div>
    </div>
  );
}
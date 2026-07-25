"use client"; 
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import jsPDF from "jspdf";

export default function ChechoutPage(){
    const { carrito, total, vaciarCarrito } = useCart();
    const {usuarioActual } = useAuth();
    const router = useRouter();
    const [procesando,setProcesando] = useState(false);

    if(!usuarioActual ){// autentificaciones
        return (
            <div className="text-center" py-5>
                <h3>Debnes iniciar session para finalizar la compra</h3>
                <button className="btn btn-primary " onClick={() => router.push("/login")}>
                    Iniciar session
                </button>
            </div>
        );
    }
    
    if(carrito.length == 0){
        return(
            <div className="text-center py-5">
                <h3>El carrito esta vacio</h3>
            </div>
        );
    }
    // aqui va toda la logica de la estrucutra de la factura, la estrucutra
    // sencilla y facil de entender del tipo encabezado cuerpo con los detalles y los productos,etc.
      function generarFactura() {
        const doc = new jsPDF();
        const numeroFactura = Math.floor(Math.random() * 900000) + 100000;
        const fecha = new Date().toLocaleString();

        doc.setFontSize(16);
        doc.text("Super Selectos - Factura de Compra", 10, 15);

        doc.setFontSize(11);
        doc.text(`Factura N: ${numeroFactura}`, 10, 28);
        doc.text(`Fecha: ${fecha}`, 10, 35);
        doc.text(`Cliente: ${usuarioActual!.nombre}`, 10, 42);
        doc.text(`Correo: ${usuarioActual!.correo}`, 10, 49);

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
    function confirmarCompra() {
    setProcesando(true);

    const { doc, numeroFactura, fecha } = generarFactura();
        // un objeto
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

    doc.save(`factura-${numeroFactura}.pdf`);

    setTimeout(() => {
      toast.success(`Factura enviada a ${usuarioActual!.correo}`);
      vaciarCarrito();
      setProcesando(false);
      router.push("/checkout/success");
    }, 1200);
  }
  // interfaz
  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <h2 className="mb-4">Confirmar Compra</h2>

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
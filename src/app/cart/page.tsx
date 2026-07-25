"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function CartPage() {
    // aca traigo todas las funciones del context para el carrito
  const { carrito, incrementar, disminuir, eliminarDelCarrito, vaciarCarrito, total } = useCart();

  function manejarEliminar(id: number, titulo: string) {
    eliminarDelCarrito(id);
    toast.error(`${titulo} eliminado`);
  }
    // aca valido si no hay nada en el carrito para mostrar el mensaje
  if (carrito.length === 0) {
    return (
      <div className="text-center py-5">
        <h3>Tu carrito esta vacio</h3>
        <Link href="/" style={{ color: "var(--color-marca)" }} className="btn mt-3">Ver catalogo</Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Mi Carrito</h2>

      {carrito.map((item) => (
        <div className="card mb-2" key={item.id}>
          <div className="d-flex align-items-center p-2 flex-wrap">
            <Image
              src={item.imagenUrl}
              alt={item.titulo}
              width={60}
              height={80}
              className="rounded"
            />
            <div className="ms-3 flex-grow-1">
              <h6 className="mb-1">{item.titulo}</h6>
              <p className="mb-0 text-muted">${item.precio.toFixed(2)} c/u</p>
            </div>

            <div className="d-flex align-items-center me-3">
              <button className="btn btn-sm btn-outline-secondary" onClick={() => disminuir(item.id)}>-</button>
              <span className="mx-2">{item.cantidad}</span>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => incrementar(item.id)}>+</button>
            </div>

            <strong className="me-3">${(item.precio * item.cantidad).toFixed(2)}</strong>

            <button
              className="btn btn-sm btn-danger"
              onClick={() => manejarEliminar(item.id, item.titulo)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-between align-items-center mt-4">
        <h4>Total: ${total.toFixed(2)}</h4>
        <div>
          <button className="btn btn-outline-secondary me-2" onClick={vaciarCarrito}>
            Vaciar carrito
          </button>
          <Link href="/checkout" className="btn btn-success">
            Finalizar compra
          </Link>
        </div>
      </div>
    </div>
  );
}
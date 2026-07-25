"use client";

import Image from "next/image";
import { Producto } from "@/types";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ producto }: { producto: Producto }) {
  const { agregarAlCarrito } = useCart();

  return (
    <div className="card tarjeta-producto mb-3">
      <div className="d-flex align-items-center p-3">
        <Image
          src={producto.imagenUrl}
          alt={producto.titulo}
          width={80}
          height={110}
          className="rounded"
        />
        <div className="ms-3">
          {/*etiqueta de las categorias*/}
          <span
            className="badge rounded-pill mb-1"
            style={{ backgroundColor: "var(--color-marca-claro)", color: "var(--color-marca-oscuro)" }}
          >
            {producto.categoria}
          </span>
          <h6 className="mb-1 mt-1">{producto.titulo}</h6>
          <strong style={{ color: "var(--color-marca)" }}>
            ${producto.precio.toFixed(2)}
          </strong>
        </div>
      </div>
      <div className="card-footer bg-white border-top-0">
        <button
          className="btn w-100 text-white"
          style={{ backgroundColor: "var(--color-marca)" }}
          onClick={() => agregarAlCarrito(producto)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
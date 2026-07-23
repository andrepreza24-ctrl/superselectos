"use client";

import Image from "next/image";
import { Producto } from "@/types";
import { useCart } from "@/context/CartContext";

export default function ProductCard({producto}: {producto: Producto}){
    const {agregarAlCarrito} = useCart();
    return (
        <div className="card mb-3">
            <div className="d-flex align-items-center p-2">
                <Image
                    src={producto.imagenUrl}
                    alt={producto.titulo}
                    width={80}
                    height={110}
                    className="rounded">
                </Image>
                <div className="ms-3">
                    <h6 className="mb-1">{producto.titulo}</h6>
                    <p className="mb-1 text-muted" >{producto.categoria}</p>
                    <strong>${producto.precio.toFixed(2)}</strong>
                </div>
            </div>
            <div className="card-footer">
                <button className="btn btn-primary w-100" onClick={() => agregarAlCarrito(producto)}>
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
}
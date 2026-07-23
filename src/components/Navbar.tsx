"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { usuarioActual, cerrarSesion } = useAuth();
  const { carrito } = useCart();

  const totalItems = carrito.reduce((sum, p) => sum + p.cantidad, 0);

  return (
    <nav className = "navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand " href="/">Super selectos</Link>
        <div className="d-flex align-items-center">
            <link className="btn btn-outline-light me-2 position-relative" href="/cart">
            Carrito{
                totalItems > 0 && (<span className="badge bg-danger ms-1">{totalItems}</span>)
            }
            </link>
            {usuarioActual ? (
                <>
                <span className="text-white mx-3">Bienvenido al Selectos {usuarioActual.nombre}</span>
                <button className="btn btn-outline-light" onClick={cerrarSesion}>Cerrar sesion</button>
                </>
            ): (
                <>
                <link className="btn btn-outline-ligth me-2" href="/login" />Iniciar Sesion
                <link className="btn btn-outline-ligth" href="/register" /> Registrarse
                </>
            )}
        </div>
    </nav>
  )
}
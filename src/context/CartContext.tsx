"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Producto } from "@/types";
import { toast } from "sonner";

interface CartContextType {
  carrito: Producto[];
  agregarAlCarrito: (producto: Producto) => void;
  incrementar: (id: number) => void;
  disminuir: (id: number) => void;
  eliminarDelCarrito: (id: number) => void;
  vaciarCarrito: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    const guardado = localStorage.getItem("carrito");
    if (guardado) setCarrito(JSON.parse(guardado));
    setCargado(true);
  }, []);

  useEffect(() => {
    if (cargado) {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  }, [carrito, cargado]);

  function agregarAlCarrito(producto: Producto) {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
    toast.success(`${producto.titulo} agregado al carrito`);
  }

  function incrementar(id: number) {
    setCarrito((prev) =>
      prev.map((p) => (p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p))
    );
  }

  function disminuir(id: number) {
    setCarrito((prev) =>
      prev.map((p) =>
        p.id === id && p.cantidad > 1 ? { ...p, cantidad: p.cantidad - 1 } : p
      )
    );
  }

  function eliminarDelCarrito(id: number) {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
    toast("Producto eliminado del carrito");
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

  return (
    <CartContext.Provider
      value={{ carrito, agregarAlCarrito, incrementar, disminuir, eliminarDelCarrito, vaciarCarrito, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
}
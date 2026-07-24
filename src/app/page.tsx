"use client";

import { useState } from "react";
import { productos } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  const categorias = ["Todas", ...new Set(productos.map((p) => p.categoria))];

  const productosFiltrados =
    categoriaSeleccionada === "Todas"
      ? productos
      : productos.filter((p) => p.categoria === categoriaSeleccionada);

  return (
    <div>
      <h2 className="mb-3">Catálogo de Productos</h2>

      <select
        className="form-select mb-4"
        value={categoriaSeleccionada}
        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
      >
        {categorias.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <div className="row">
        {productosFiltrados.map((producto) => (
          <div className="col-12 col-md-6 col-lg-4">
            <ProductCard key={producto.id} producto={producto} />
          </div>
        ))}
      </div>
    </div>
  );
}
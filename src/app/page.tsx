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
      <div className="banner-bienvenida mb-4">
        <h2 className="mb-1">Super Selectos</h2>
        <p className="mb-0">Los productos de la canasta basica, siempre frescos</p>
      </div>
      <h4 className="mb-3">Catalogo de Productos</h4>
      <div className="d-flex gap-2 mb-4" style={{ overflowX: "auto", paddingBottom: "6px" }}>
        {categorias.map((cat) => (
          <button
            key={cat}
            className="btn boton-categoria"
            style={
              categoriaSeleccionada === cat
                ? { backgroundColor: "var(--color-marca)", color: "white" }
                : { backgroundColor: "var(--color-marca-claro)", color: "var(--color-marca-oscuro)" }
            }
            onClick={() => setCategoriaSeleccionada(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="row">
        {productosFiltrados.map((producto) => (
          <div className="col-12 col-md-6 col-lg-4" key={producto.id}>
            <ProductCard producto={producto} />
          </div>
        ))}
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  // estados simples para capturar lo que ponga en el form
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const { registrar } = useAuth();
  const router = useRouter();

  function manejarEnvio(e: React.FormEvent) {
    e.preventDefault();

    // esto es para ver si no viene vacio nada
    if (!nombre || !correo || !contrasena) {
      setError("Todos los campos son obligatorios");
      return;
    }

    // esto va a mandar los datos directos al contexto para guardar el usuario
    const exito = registrar({ nombre, correo, contrasena });

    // si esto pasa manda de un solo a login
    if (exito) {
      router.push("/login");
    } else {
      setError("Ya existe una cuenta con ese correo");
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-6 col-lg-4">
        <h2 className="mb-3">Crear cuenta</h2>
        <form onSubmit={manejarEnvio}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contrasena</label>
            <input
              type="password"
              className="form-control"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button className="btn btn-primary w-100" type="submit">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
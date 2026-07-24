"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const { registrar } = useAuth();
  const router = useRouter();

  function manejarEnvio(e: React.FormEvent) {
    e.preventDefault();
    // aca limpio el error viejo por si le vuelve a dar click al boton
    setError("");

    // quito espacios de mas para que no mande espacios guardados por error
    const nombreLimpio = nombre.trim();
    const correoLimpio = correo.trim();

    // aca valido que vengan llenos los campos despues de quitar espacios
    if (!nombreLimpio || !correoLimpio || !contrasena) {
      setError("Todos los campos son obligatorios");
      return;
    }

    // si hace esto es para evitar que manden claves super cortas que rompan sesion
    if (contrasena.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // mando la data limpia al contexto
    const exito = registrar({ nombre: nombreLimpio, correo: correoLimpio, contrasena });

    if (!exito) {
      setError("Ya existe una cuenta con ese correo");
      return;
    }

    // si llega aca todo salio bien y manda al login
    router.push("/login");
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-6 col-lg-4">
        <h2 className="mb-3">Crear cuenta</h2>
        <form onSubmit={manejarEnvio}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
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
            <label className="form-label">Contraseña</label>
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
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

    // Aca limpio el error viejo por si el usuario vuelve a dar click al boton
    setError("");

    // Quito espacios al inicio y al final para evitar guardar datos incorrectos
    const nombreLimpio = nombre.trim();
    const correoLimpio = correo.trim();

    // Valido que todos los campos tengan informacion
    if (!nombreLimpio || !correoLimpio || !contrasena) {
      setError("Todos los campos son obligatorios");
      return;
    }

    // Evito que registren contraseñas demasiado cortas
    if (contrasena.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Envio la informacion limpia al contexto para registrar el usuario
    const exito = registrar({
      nombre: nombreLimpio,
      correo: correoLimpio,
      contrasena,
    });

    // Si ya existe un usuario con ese correo muestro el mensaje
    if (!exito) {
      setError("Ya existe una cuenta con ese correo");
      return;
    }

    // Si todo sale bien redirijo al login
    router.push("/login");
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "75vh" }}
    >
      <div className="col-12 col-sm-8 col-md-6 col-lg-4">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h3
              className="text-center mb-4"
              style={{ color: "var(--color-marca)" }}
            >
              Crear cuenta
            </h3>

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

              {/* Muestro el mensaje solo si existe algun error */}
              {error && <p className="text-danger">{error}</p>}

              <button
                className="btn w-100 text-white mt-2"
                style={{ backgroundColor: "var(--color-marca)" }}
                type="submit"
              >
                Registrarse
              </button>
            </form>

            <p className="text-center mt-3 mb-0">
              Ya tienes cuenta?{" "}
              <Link
                href="/login"
                style={{ color: "var(--color-marca)" }}
              >
                Inicia sesion aqui
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
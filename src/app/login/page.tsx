"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const { iniciarSesion } = useAuth();
  const router = useRouter();

  function manejarEnvio(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const exito = iniciarSesion(correo, contrasena);
    if (!exito) {
      setError("Correo o contrasena incorrectos");
      return;
    }

    router.push("/");
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "75vh" }}
    >
      <div className="col-12 col-sm-8 col-md-6 col-lg-4">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h3 className="text-center mb-4" style={{ color: "var(--color-marca)" }}>
              Iniciar sesion
            </h3>
            <form onSubmit={manejarEnvio}>
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
              <button
                className="btn w-100 text-white mt-2"
                style={{ backgroundColor: "var(--color-marca)" }}
                type="submit"
              >
                Entrar
              </button>
            </form>

            <p className="text-center mt-3 mb-0">
              No tienes cuenta?{" "}
              <Link href="/register" style={{ color: "var(--color-marca)" }}>
                Registrate aqui
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
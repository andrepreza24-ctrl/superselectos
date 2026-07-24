"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  // estados para guardar el correo y clave del usuario
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  
  const { iniciarSesion } = useAuth();
  const router = useRouter();

  function manejarEnvio(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // esto manda a llamar a la funcion del contexto para validar las credenciales
    const exito = iniciarSesion(correo, contrasena);
    if (!exito) {
      setError("Correo o contrasena incorrectos");
      return;
    }

    // si pasa manda de un solo al inicio
    router.push("/");
  }

  return (
    // typo en classsName
    <div classsName="row justify-content-center">
      <div className="col-12 col-md-6 col-lg-4">
        <h2 className="mb-3">Iniciar sesion</h2>
        <form onSubmit={manejarEnvio}>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              // typo en classsName
              classsName="form-control"
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
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Usuario } from "@/types";

interface AuthContextType {
  usuarioActual: Usuario | null;
  iniciarSesion: (correo: string, contrasena: string) => boolean;
  registrar: (usuario: Usuario) => boolean;
  cerrarSesion: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null);

  useEffect(() => {
    const guardado = localStorage.getItem("usuarioActual");
    if (guardado) setUsuarioActual(JSON.parse(guardado));
  }, []);

  function obtenerUsuarios(): Usuario[] {
    const data = localStorage.getItem("usuarios");
    return data ? JSON.parse(data) : [];
  }

  function registrar(usuario: Usuario): boolean {
    const usuarios = obtenerUsuarios();
    const existe = usuarios.some((u) => u.correo === usuario.correo);
    if (existe) return false;

    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    return true;
  }

  function iniciarSesion(correo: string, contrasena: string): boolean {
    const usuarios = obtenerUsuarios();
    const usuario = usuarios.find(
      (u) => u.correo === correo && u.contrasena === contrasena
    );
    if (!usuario) return false;

    setUsuarioActual(usuario);
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));
    return true;
  }

  function cerrarSesion() {
    setUsuarioActual(null);
    localStorage.removeItem("usuarioActual");
  }

  return (
    <AuthContext.Provider
      value={{ usuarioActual, iniciarSesion, registrar, cerrarSesion }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}
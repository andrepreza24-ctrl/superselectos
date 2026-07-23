export interface Producto {
  id: number;
  titulo: string;
  precio: number;
  imagenUrl: string;
  cantidad: number;
  categoria: string;
}

export interface Usuario {
  nombre: string;
  correo: string;
  contrasena: string;
}
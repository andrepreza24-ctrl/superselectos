# Super Selectos 
Aplicacion de comercio electronico desarrollada como Primer Desafio Practico de la materia Diseño y Programacion de Software Multiplataforma (DPS104), Universidad Don Bosco.
Tienda simulada de productos de la canasta basica, con catalogo, autenticacion de usuarios, carrito de compras y generacion/envio de factura.

## Sitio publicado
https://superselectos.vercel.app/

## Video demostrativo
https://drive.google.com/drive/folders/1SzGLMCKHggzRAeWfXVXVb-Zr_7VW_rCI?usp=drive_link

## Tecnologias utilizadas
- React
- TypeScript
- Next.js (App Router)
- Bootstrap y React Bootstrap
- Sonner (notificaciones)
- jsPDF (generacion de factura en PDF)
- EmailJS (envio de factura por correo electronico)
- Cloudinary (alojamiento de imagenes de productos)
- Vercel (despliegue)

## Funcionalidades
- Registro e inicio de sesion de usuarios (simulado con localStorage)
- Catalogo de 20 productos con filtrado por categoria
- Carrito de compras: agregar, incrementar/disminuir cantidad, eliminar productos
- Persistencia del carrito en localStorage (se mantiene al refrescar la pagina)
- Notificaciones de confirmacion con Sonner
- Generacion de factura en PDF tras la compra
- Envio de la factura por correo electronico real (EmailJS)
- Diseño responsive, mobile-first

## Instalacion y ejecucion local

1. Clonar el repositorio

git clone https://github.com/andrepreza24-ctrl/superselectos.git

2. Entrar a la carpeta del proyecto

cd superselectos

3. Instalar las dependencias

npm install


4. Ejecutar el proyecto en modo desarrollo

npm run dev

5. Abrir en el navegador
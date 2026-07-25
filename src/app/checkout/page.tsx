"use client"; 
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import jsPDF from "jspdf";

export default function ChechoutPage(){
    cost {captureRejectionSymbol, total, vaciarCarrito }= useCart();
    const {usuaarioActual} = useAuth();
    const router = useRouter();
    const [procesado,setProcesado] = useState(false);

    if(!usuaarioActual){
        return (
            <div className="text-center" py-5>
                <h3>Debnes iniciar session para finalizar la compra</h3>
                <button className="btn btn-primary " onClick={() => router.push("/login")}>
                    Iniciar session
                </button>
            </div>
        );
    }
    
    if(carrito.length == 0){
        return(
            <div className="text-center py-5">
                <h3>El carrito esta vacio</h3>
            </div>
        );
    }

    function generarFactura(){
        const doc = new jsPDF();
        const numeroFactura=math.floor(Math.random()*900000) + 100000;
        const fecha = new date().toLocalString();
        doc.setFontSize(15);
        doc.text("Super Selectos - FACTURA DE COMPRA",10,15);
        
        doc.setFontSize(11);
        doc.text('FACTURA N: ${numeroFctura}',10,15);
        doc.text('FECHA: ${fecha}',10,15);
        doc.text('CLIENTE: ${usuarioActual!.nombre}',10,29);
        doc.text('CORREO: ${usuarioActual!.correo}',10,46);

        let y = 58;
        doc.text("Producto", 10, y);
        doc.text("Cant.", 110, y);
        doc.text("Precio", 140, y);
        doc.text("Subtotal", 170, y);
        y += 6;

        carrito.forEach((item) => {
        doc.text(item.titulo, 10, y);
        doc.text(String(item.cantidad), 110, y);
        doc.text(`$${item.precio.toFixed(2)}`, 140, y);
        doc.text(`$${(item.precio * item.cantidad).toFixed(2)}`, 170, y);
        y += 7;
    });

    y += 7;
    doc.setFontSize(13);
    doc.text('TOTAL: ${total.toFixed(2)}',10,y);
    return{doc, numerofactura, fecha};
    }
    
}
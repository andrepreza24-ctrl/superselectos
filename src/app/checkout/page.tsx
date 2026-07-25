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
                <button className="btn btn-primary mt-3" onClick={() => router.push("/login")}>
                    Iniciar session
                </button>
            </div>
        );
    }
    
}
import Link from "next/link";

export default function checkoutSuccessPage(){{
    return(
        <div className="text-center py-5">
            <h2 className="text-success mb-3">La compra fue realizada con exito</h2>
            <p>Tu factura fue enviada a tu correo electronico</p>
            <link href="/" className="btm btn-primary mt-3" />
            <Link href="/" className="btn btn-primary mt-3">Volver al catalogo</Link>
        </div>
    );
}}
import React from "react";
import NavPub from "../NavPub/NavPub.jsx";




const Home = () => {
    return (
        <>
            <NavPub />
           
            
            <div className="px-4 py-5 my-5 text-center">
                <img rel="icon" type="image/svg+xml" src="/Logo-Icono.svg" width="500px"/>
                <h1 className="display-5 fw-bold text-body-emphasis">Mercasoftx</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">
                    Es una herramienta diseñada para la gestión de la información de comercialización de productos de la unidad MERCASENA del Centro Agropecuario “La Granja” del SENA Espinal, Regional Tolima. 
                    </p>
                    <h1 className="display-5 fw-bold text-body-emphasis">Grupo de trabajo</h1>
                   <img src="/imagen-grupo.jpg" width="900"/>
                </div>
            </div>
        </>
    )
}

export default Home;

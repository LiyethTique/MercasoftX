import React from "react";
import NavPub from "../NavPub/NavPub.jsx";




const Home = () => {
  return (
    <>
      <NavPub />
      <center>
        <main className="form-signin   w-100 m-auto">
          <img rel="icon" type="image/svg+xml" src="/Logo-Icono.svg" width="400px" />
          <p className="lead mb-4">
            Es una herramienta diseñada para la gestión de la información de comercialización de productos de la unidad MERCASENA del Centro Agropecuario “La Granja” del SENA Espinal, Regional Tolima.
          </p>
        </main>
      </center>

    </>
  )
}

export default Home;

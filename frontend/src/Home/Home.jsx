import React from "react";
import NavPub from "../NavPub/NavPub.jsx";
import "./home.css"; // Asegúrate de que este archivo se importe correctamente

const Home = () => {
  return (
    <>
      <NavPub />
      <main className="form-signin w-100 m-auto home-container">
        <div className="text-center">
          <img rel="icon" type="image/svg+xml" src="/Logo-Icono.svg" width="400px" className="home-image" />
          <p className="lead mb-4">
            Es una herramienta diseñada para la gestión de la información de comercialización de productos de la unidad MERCASENA del Centro Agropecuario “La Granja” del SENA Espinal, Regional Tolima.
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;

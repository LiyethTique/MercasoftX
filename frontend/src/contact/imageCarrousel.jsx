import React from "react";
import NavPub from "../NavPub/NavPub";

const developers = [
  {
    image: "/liye-tique.jpg",
    name: "LIYE JIMENA TIQUE TIQUE",
    role: "Gerente,Analista-Desarrollador",
  },
  {
    name: "EDWAR MAURICIO ROJAS VARGAS",
    role: "Sub-Gerente,Analista-Desarrollador",
    image: "/edwar-rojas.jpg",
  },
  {
    name: "JUAN ESTEBAN LEON GARCIA",
    role: "Analista-Desarrollador",
    image: "/juan-esteban.jpg",
  },
  {
    name: "JESUS ALBERTO MOLINA LEAL",
    role: "Analista-Desarrollador",
    image: "/jesus-molina.jpg",
  },
  {
    name: "YAIR ESTEBAN MORALES REYES",
    role: "Analista-Desarrollador",
    image: "/yair-morales.jpg",
  }
];

const ContactPage = () => {
  return (
    <>
      <NavPub />
      
      <div className="contacts-page" style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Grupo Desarrollador</h2>
        <br/>
        <div className="developers-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '20px',
          maxWidth: '1200px', 
          margin: '0 auto'
        }}>
          {developers.slice(0, 3).map((developer, index) => (
            <div key={index} className="developer-card" style={{ textAlign: 'center' }}>
              <img
                src={developer.image}
                alt={developer.name}
                style={{ width: '50%', height: 'auto', borderRadius: '10px' }}
              />
             
              <h3 style={{ fontSize: '22px', marginTop: '10px' }}>{developer.name}</h3> {/* Tamaño de letra para el nombre */}
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{developer.role}</p> {/* Tamaño de letra para el rol */}
            </div>
          ))}
        </div>
        <div className="developers-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '20px',
          maxWidth: '1200px', 
          margin: '30px auto'
        }}>
          {developers.slice(3).map((developer, index) => (
            <div key={index} className="developer-card" style={{ textAlign: 'center' }}>
              <img
                src={developer.image}
                alt={developer.name}
                style={{ width: '35%', height: 'auto', borderRadius: '15px' }}
              />
              <h3 style={{ fontSize: '22px', marginTop: '10px' }}>{developer.name}</h3> {/* Tamaño de letra para el nombre */}
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{developer.role}</p> {/* Tamaño de letra para el rol */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContactPage;

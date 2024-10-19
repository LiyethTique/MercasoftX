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
  },
];

const ContactPage = () => {
  const styles = {
    container: {
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#333',
    },
    highlight: {
      color: '#ff6600', // Naranja
    },
    grid: {
      display: 'grid',
      gap: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    firstGrid: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    secondGrid: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      marginTop: '30px',
    },
    card: {
      textAlign: 'center',
      backgroundColor: '#fff',
      padding: '15px',
      borderRadius: '15px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease',
    },
    cardHover: {
      transform: 'scale(1.05)',
    },
    image: {
      width: '50%',
      height: 'auto',
      borderRadius: '10px',
      transition: 'transform 0.3s ease',
    },
    name: {
      fontSize: '22px',
      marginTop: '10px',
      color: '#333',
    },
    role: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#666',
    },
  };

  return (
    <>
      <NavPub />
      <div className="contacts-page" style={styles.container}>
        <h2 style={styles.title}>
          Grupo <span style={styles.highlight}>Desarrollador</span>
        </h2>
        <br />
        <div style={{ ...styles.grid, ...styles.firstGrid }}>
          {developers.slice(0, 3).map((developer, index) => (
            <div
              key={index}
              className="developer-card"
              style={styles.card}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <img
                src={developer.image}
                alt={developer.name}
                style={styles.image}
              />
              <h3 style={styles.name}>{developer.name}</h3>
              <p style={styles.role}>{developer.role}</p>
            </div>
          ))}
        </div>
        <div style={{ ...styles.grid, ...styles.secondGrid }}>
          {developers.slice(3).map((developer, index) => (
            <div
              key={index}
              className="developer-card"
              style={styles.card}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <img
                src={developer.image}
                alt={developer.name}
                style={{ ...styles.image, width: '35%' }}
              />
              <h3 style={styles.name}>{developer.name}</h3>
              <p style={styles.role}>{developer.role}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContactPage;

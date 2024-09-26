// Cambia el nombre del componente a AlertaBDVacia.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlertaBDVacia = ({ uri }) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(uri);
        if (Array.isArray(response.data) && response.data.length === 0) {
          setShowMessage(true);
        } else {
          setShowMessage(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setShowMessage(true);
      }
    };

    fetchData();
  }, [uri]);

  return (
    showMessage && (
      <div className="alert alert-warning text-center" role="alert">
        No hay registros en la base de datos
      </div>
    )
  );
};

export default AlertaBDVacia;
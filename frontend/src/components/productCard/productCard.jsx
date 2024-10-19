import React from 'react';

const URI_IMG = `${process.env.REACT_APP_SERVER_BACK}${process.env.REACT_APP_IMAGE_PATH}`;

const ProductCard = ({ name, description, price, stock, imageUrl, onAddToCart }) => {
  const formattedPrice = isNaN(price) ? 'N/A' : parseFloat(price).toFixed(2);
  
  const cardStyle = {
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
    margin: '15px',
    width: '300px',
  };

  const imageStyle = {
    height: '150px',
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
  };

  const cardBodyStyle = {
    paddingLeft: '20px', // Desplaza el contenido hacia la derecha
  };

  const nameStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#333',
    margin: '10px 0',
  };

  const descriptionStyle = {
    color: '#666',
    fontSize: '0.9rem',
    margin: '0',
  };

  const priceStyle = {
    color: '#ff8c42',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    margin: '10px 0',
  };

  const stockStyle = {
    color: stock > 0 ? '#777' : 'red', // Cambia el color si está agotado
    fontSize: '0.85rem',
    margin: '10px 0',
  };

  const buttonStyle = {
    backgroundColor: 'grey',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    borderRadius: '25px',
    cursor: stock > 0 ? 'pointer' : 'not-allowed', // Cambia el cursor si está agotado
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    marginTop: '10px',
    margin: '10px'
  };

  return (
    <div style={cardStyle} className="product-card">
      <img src={imageUrl || URI_IMG} style={imageStyle} alt={name} />
      <div className="card-body" style={cardBodyStyle}>
        <h5 style={nameStyle}>{name}</h5>
        <p style={descriptionStyle}>{description}</p>
        <p style={priceStyle}>Precio: <span>${formattedPrice}</span></p>
        <p style={stockStyle}>Existencia: {stock > 0 ? stock : 'Producto Agotado'}</p>
        <button
          style={buttonStyle}
          onClick={stock > 0 ? onAddToCart : null} // Solo llama a la función si hay stock
          disabled={stock === 0} // Desactiva el botón si está agotado
        >
          Añadir Producto al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
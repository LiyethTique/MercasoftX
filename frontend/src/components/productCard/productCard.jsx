import React, { useState } from 'react';
import './productCard.css';

const ProductCard = ({
  name = "Huevos",
  description = "AAA",
  price = 99.99,
  imageUrl = "https://via.placeholder.com/200" // Usa una URL de imagen por defecto
}) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <>
      <div className="card product-card shadow-sm">
        <img src={imageUrl} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">${price.toFixed(2)}</span>
            <div className="d-flex align-items-center">
              <button className="btn btn-outline-secondary" onClick={decrementQuantity}>-</button>
              <span className="mx-3">{quantity}</span>
              <button className="btn btn-outline-secondary" onClick={incrementQuantity}>+</button>
            </div>
          </div>
          <button className="btn btn-warning w-100 mt-3 fw-bold">Agregar al carrito</button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;

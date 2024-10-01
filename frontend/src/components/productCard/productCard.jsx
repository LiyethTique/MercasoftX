import React, { useState } from 'react';
import './productCard.css';

const ProductCard = ({
  name = "Huevos",
  description = "AAA",
  price = 99.99,
  imageUrl = "https://via.placeholder.com/200",
  onAddToCart // Recibe la función como prop
}) => {
  const [quantity, setQuantity] = useState(1);

  // Función para incrementar la cantidad
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  
  // Función para decrementar la cantidad (mínimo 1)
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const handleAddToCart = () => {
    const product = { name, price, quantity }; // Puedes incluir otros detalles según sea necesario
    onAddToCart(product); // Llama la función para agregar al carrito
    setQuantity(1); // Resetea la cantidad al agregar al carrito
  };

  return (
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
        <button className="btn btn-warning w-100 mt-3 fw-bold" onClick={handleAddToCart}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

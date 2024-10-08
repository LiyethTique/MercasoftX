import React, { useState } from 'react';
import './productCard.css';

const ProductCard = ({
  product, // Recibe el objeto de producto
  onAddToCart // Recibe la función como prop
}) => {
  const { 
    Nom_Producto = "Huevos", 
    Car_Producto = "Descripción del producto", 
    Pre_Producto = 99.99, 
    Ima_Producto = "https://via.placeholder.com/200", 
    Exi_Producto = 0 // Agregar propiedad para existencias
  } = product; // Desestructura las propiedades del producto

  const [quantity, setQuantity] = useState(1);

  // Función para incrementar la cantidad
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  
  // Función para decrementar la cantidad (mínimo 1)
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const handleAddToCart = () => {
    const productToAdd = {
      name: Nom_Producto,
      description: Car_Producto,
      price: Pre_Producto,
      quantity,
    };
    onAddToCart(productToAdd); // Llama la función para agregar al carrito
    setQuantity(1); // Resetea la cantidad al agregar al carrito
  };

  return (
    <div className="card product-card shadow-sm">
      <img 
        src={Ima_Producto || "https://via.placeholder.com/200"} 
        className="card-img-top" 
        alt={Nom_Producto} 
      />
      <div className="card-body">
        <h5 className="card-title">{Nom_Producto}</h5>
        <p className="card-text">{Car_Producto}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold">${Pre_Producto.toFixed(2)}</span>
          <div className="d-flex align-items-center">
            <button 
              className="btn btn-outline-secondary" 
              onClick={decrementQuantity}
            >
              -
            </button>
            <span className="mx-3">{quantity}</span>
            <button 
              className="btn btn-outline-secondary" 
              onClick={incrementQuantity}
            >
              +
            </button>
          </div>
        </div>
        {Exi_Producto > 0 ? ( // Muestra el botón solo si hay existencias
          <button 
            className="btn btn-warning w-100 mt-3 fw-bold" 
            onClick={handleAddToCart}
          >
            Agregar al carrito
          </button>
        ) : (
          <button className="btn btn-secondary w-100 mt-3 fw-bold" disabled>
            Sin stock
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
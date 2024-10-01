import React, { useState, useEffect } from 'react';
import './ShoppingCart.css';

const ShoppingCart = () => {
  // Estado para almacenar los productos en el carrito, inicializamos desde localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Productos disponibles (podrías cargarlos desde una API)
  const products = [
    { id: 1, name: 'Zapato deportivo', image: 'https://example.com/shoe-image.jpg', price: 50000, discount: 20 },
    { id: 2, name: 'Camiseta', image: 'https://example.com/t-shirt-image.jpg', price: 30000, discount: 15 },
    { id: 3, name: 'Mochila', image: 'https://example.com/backpack-image.jpg', price: 45000, discount: 10 },
  ];

  // Guardar los cambios del carrito en localStorage cuando se actualicen los productos
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Función para actualizar la cantidad de productos en el carrito
  const updateQuantity = (productId, quantity) => {
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity: Math.max(quantity, 1) } : item
    ));
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  // Calcular el subtotal del carrito
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Calcular impuestos y envío
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = subtotal * 0.19; // Suponiendo 19% de impuestos
    const shipping = subtotal > 100000 ? 0 : 10000; // Envío gratis si el subtotal es mayor a 100,000
    return subtotal + tax + shipping;
  };

  return (
    <div className="shopping-cart">
      {/* Sección de productos disponibles */}
      <div className="available-products">
        <h2>PRODUCTOS DISPONIBLES</h2>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>Precio: ${product.price}</p>
              <button onClick={() => addToCart(product)}>Agregar al carrito</button>
            </div>
          ))}
        </div>
      </div>

      {/* Sección del carrito */}
      <div className="cart-section">
        <h1>Carrito</h1>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>Precio: ${item.price}</p>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  />
                  <p>Total: ${item.price * item.quantity}</p>
                  <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
                </div>
              </div>
            ))}
            <div className="cart-summary">
              <h2>Resumen</h2>
              <p>Subtotal: ${calculateSubtotal()}</p>
              <p>Impuestos (19%): ${(calculateSubtotal() * 0.19).toFixed(2)}</p>
              <p>Envío: ${calculateSubtotal() > 100000 ? 'Gratis' : '10,000'}</p>
              <h3>Total a pagar: ${calculateTotal().toFixed(2)}</h3>
              <button>Pagar</button>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <img src="/cart-plus.svg" alt="Carrito vacío" className="empty-cart-icon" />
            <p>Tu carrito está vacío.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import './ShoppingCart.css';
import ClienteForm from '../Cliente/formCliente';

const CartModal = ({ children }) => (
  <div
    style={{
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '20px',
      width: '729px',
      maxWidth: '100%',
      position: 'relative',
      animation: 'slide-down 0.3s ease-out',
    }}
  >
    {children}
  </div>
);

const CloseButton = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: 'none',
      border: 'none',
      fontSize: '1.8rem',
      cursor: 'pointer',
      color: '#ff8c42',
      transition: 'color 0.3s ease',
    }}
    onMouseOver={(e) => (e.currentTarget.style.color = '#ff5200')}
    onMouseOut={(e) => (e.currentTarget.style.color = '#ff8c42')}
  >
    &times; {/* Close icon */}
  </button>
);

const CartTitle = () => (
  <h2
    style={{
      color: '#ff8c42',
      fontSize: '1.8rem',
      marginBottom: '20px',
      textAlign: 'center',
      fontWeight: 600,
    }}
  >
    Carrito de Compras
  </h2>
);

const CartItemsList = ({ children }) => (
  <ul
    style={{
      listStyleType: 'none',
      padding: '0',
    }}
  >
    {children}
  </ul>
);

const CartItem = ({ children }) => (
  <li
    style={{
      margin: '15px 0',
      padding: '20px',
      border: '1px solid #f0f0f0',
      borderRadius: '12px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff8f0',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.backgroundColor = '#ffe0b2';
      e.currentTarget.style.transform = 'scale(1.02)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.backgroundColor = '#fff8f0';
      e.currentTarget.style.transform = 'scale(1)';
    }}
  >
    {children}
  </li>
);

const ItemTitle = ({ title }) => (
  <h3
    style={{
      margin: '0',
      fontSize: '1.2rem',
      color: '#333',
    }}
  >
    {title}
  </h3>
);

const ItemQuantity = ({ quantity }) => (
  <p
    style={{
      margin: '0',
      fontSize: '1rem',
      color: '#777',
    }}
  >
    Cantidad: {quantity}
  </p>
);

const ItemButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    style={{
      padding: '8px 15px',
      border: 'none',
      borderRadius: '8px',
      color: '#fff',
      backgroundColor: '#ff8c42',
      cursor: 'pointer',
      fontSize: '0.9rem',
      transition: 'background-color 0.3s, transform 0.1s',
    }}
    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#ff6f00')}
    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ff8c42')}
    onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
    onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
  >
    {children}
  </button>
);

const Total = ({ total }) => (
  <p
    style={{
      fontSize: '1.4rem',
      fontWeight: 'bold',
      color: '#333',
      marginTop: '30px',
      textAlign: 'right',
    }}
  >
    Total: ${total} COP
  </p>
);

const OrderButton = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: '100%',
      padding: '15px 0',
      border: 'none',
      borderRadius: '10px',
      backgroundColor: '#ff6600',
      color: '#fff',
      fontSize: '1.2rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s, box-shadow 0.3s',
      marginTop: '20px',
      boxShadow: '0 4px 12px rgba(255, 102, 0, 0.4)',
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.backgroundColor = '#ff5200';
      e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 102, 0, 0.6)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.backgroundColor = '#ff6600';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 102, 0, 0.4)';
    }}
  >
    Hacer Pedido
  </button>
);

const Cart = ({ carrito = [], setCarrito }) => {
  const [showForm, setShowForm] = useState(false);
  const [clienteData, setClienteData] = useState(null);

  console.log('Contenido de carrito:', carrito); // Verifica el contenido del carrito

  const eliminarDelCarrito = (idProducto) => {
    const carritoActualizado = carrito.filter(item => item.Id_Producto !== idProducto);
    setCarrito(carritoActualizado);
    Swal.fire('¡Producto eliminado!', 'El producto ha sido eliminado del carrito.', 'info');
  };

  const aumentarCantidad = (idProducto, existencia) => {
    const existingItem = carrito.find(item => item.Id_Producto === idProducto);
    
    if (existingItem.Can_Producto < existencia) {
      const carritoActualizado = carrito.map(item =>
        item.Id_Producto === idProducto
          ? { ...item, Can_Producto: item.Can_Producto + 1 }
          : item
      );
      setCarrito(carritoActualizado);
    } else {
      Swal.fire('¡No puedes agregar más!', `Solo quedan ${existencia} unidades disponibles.`, 'warning');
    }
  };

  const disminuirCantidad = (idProducto) => {
    const carritoActualizado = carrito.map(item =>
      item.Id_Producto === idProducto && item.Can_Producto > 1
        ? { ...item, Can_Producto: item.Can_Producto - 1 }
        : item
    );
    setCarrito(carritoActualizado);
  };
  
  const total = carrito.reduce((total, item) => total + item.Pre_Producto * item.Can_Producto, 0).toFixed(2);

  return (
    <CartModal>
      <CartTitle />
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <CartItemsList>
            {carrito.map(item => (
              <CartItem key={item.Id_Producto}>
                <ItemTitle title={item.Nom_Producto} />
                <ItemQuantity quantity={item.Can_Producto} />
                <div>
                  <ItemButton onClick={() => disminuirCantidad(item.Id_Producto)}>-</ItemButton>
                  <ItemButton onClick={() => aumentarCantidad(item.Id_Producto, item.Exi_Producto)}>+</ItemButton>
                  <ItemButton onClick={() => eliminarDelCarrito(item.Id_Producto)}>Eliminar</ItemButton>
                </div>
              </CartItem>
            ))}
          </CartItemsList>
          <Total total={total} />
          <OrderButton onClick={() => setShowForm(true)} />
          {showForm && (
            <ClienteForm
              setShowForm={setShowForm}
              setClienteData={setClienteData}
              carrito={carrito} // Asegúrate de pasar el carrito aquí
            />
          )}
        </>
      )}
    </CartModal>
  );
};

export default Cart;

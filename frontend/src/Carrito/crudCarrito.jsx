import React, { useState } from 'react';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import axios from 'axios';
import './ShoppingCart.css';
import ClienteForm from '../Cliente/formCliente';


const CartModal = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 20px;
  width: 729px;
  max-width: 100%;
  position: relative;
  animation: slide-down 0.3s ease-out;

  @keyframes slide-down {
    from {
      transform: translateY(-30%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;


const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #ff8c42;
  transition: color 0.3s ease;

  &:hover {
    color: #ff5200;
  }
`;

const CartTitle = styled.h2`
  color: #ff8c42;
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
`;

const CartItemsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CartItem = styled.li`
  margin: 15px 0;
  padding: 20px;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff8f0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #ffe0b2;
    transform: scale(1.02);
  }
`;

const ItemTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: #333;
`;

const ItemQuantity = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #777;
`;

const ItemButton = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: 8px;
  color: #fff;
  background-color: #ff8c42;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s, transform 0.1s;

  &:hover {
    background-color: #ff6f00;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  & + & {
    margin-left: 10px;
  }
`;

const Total = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
  margin-top: 30px;
  text-align: right;
`;

const OrderButton = styled.button`
  width: 100%;
  padding: 15px 0;
  border: none;
  border-radius: 10px;
  background-color: #ff6600;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  margin-top: 20px;
  box-shadow: 0 4px 12px rgba(255, 102, 0, 0.4);

  &:hover {
    background-color: #ff5200;
    box-shadow: 0 6px 16px rgba(255, 102, 0, 0.6);
  }
`;

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
      <CartTitle>Carrito de Compras</CartTitle>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <CartItemsList>
            {carrito.map(item => (
              <CartItem key={item.Id_Producto}>
                <ItemTitle>{item.Nom_Producto}</ItemTitle>
                <ItemQuantity>Cantidad: {item.Can_Producto}</ItemQuantity>
                <div>
                  <ItemButton onClick={() => disminuirCantidad(item.Id_Producto)}>-</ItemButton>
                  <ItemButton onClick={() => aumentarCantidad(item.Id_Producto, item.Exi_Producto)}>+</ItemButton>
                  <ItemButton onClick={() => eliminarDelCarrito(item.Id_Producto)}>Eliminar</ItemButton>
                </div>
              </CartItem>
            ))}
          </CartItemsList>
          <Total>Total: ${total} COP</Total>
          <OrderButton onClick={() => setShowForm(true)}>Hacer Pedido</OrderButton>
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

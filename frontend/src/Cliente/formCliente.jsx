import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styled from 'styled-components';

const URI_CLIENTE = process.env.REACT_APP_SERVER_BACK + '/cliente/';
const URI_CARRITO = process.env.REACT_APP_SERVER_BACK + '/carrito/'; // Cambia a la URI correcta para el carrito
const URI_PEDIDO = process.env.REACT_APP_SERVER_BACK + '/pedido/';
const URI_PEDIDO_PRODUCTO = process.env.REACT_APP_SERVER_BACK + '/pedidoProducto/'

// Estilos para la ventana emergente y formulario
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 12px 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;

  &:focus {
    border-color: #ff8c42;
    box-shadow: 0 0 6px rgba(255, 140, 66, 0.5);
  }
`;

const Select = styled.select`
  padding: 12px 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;

  &:focus {
    border-color: #ff8c42;
    box-shadow: 0 0 6px rgba(255, 140, 66, 0.5);
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #ff8c42;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff5200;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-bottom: 15px;
`;

const StyledTitle = styled.h2`
  color: #ff8c42; /* Color naranja elegante */
  font-size: 1.5rem; /* Tamaño de fuente */
  margin-bottom: 20px; /* Espaciado inferior */
  font-weight: bold; /* Negrita */
  text-align: center; /* Centrado */
`;

const ClienteForm = ({ setShowForm, setClienteData, carrito }) => {
  const [cliente, setCliente] = useState({
    Nom_Cliente: '',
    Cor_Cliente: '',
    Tel_Cliente: '',
    Dir_Cliente: '',
    Tip_Cliente: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    if (!cliente.Nom_Cliente.trim()) {
      errors.Nom_Cliente = 'El nombre es requerido';
    }
    if (!cliente.Tel_Cliente.trim()) {
      errors.Tel_Cliente = 'El teléfono es requerido';
    } else if (!/^[3]{1}[0-9]{9}$/.test(cliente.Tel_Cliente.replace(/ /g, ''))) {
      errors.Tel_Cliente = 'El teléfono debe tener 10 dígitos y comenzar con 3';
    }
    if (!cliente.Dir_Cliente.trim()) {
      errors.Dir_Cliente = 'La dirección es requerida';
    }
    if (!cliente.Tip_Cliente) {
      errors.Tip_Cliente = 'El tipo de cliente es requerido';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length > 0) {
      const firstDigit = digits.charAt(0);
      if (firstDigit !== '3') {
        return '';
      }
    }
    const formatted = digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3').trim();
    return formatted.substring(0, 12);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'Tel_Cliente' ? formatPhoneNumber(value) : value;
    setCliente({ ...cliente, [name]: updatedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    try {
      Swal.fire({
        title: 'Enviando Cliente...',
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      // Enviar datos del cliente
      const responseCliente = await axios.post(URI_CLIENTE, cliente);
      console.log("responseCliente: ", responseCliente);
  
      if (responseCliente.status === 201) {
        setClienteData(responseCliente.data.cliente);
        const clienteId = responseCliente.data.cliente?.Id_Cliente;
  
        // Crear carrito para cada producto en el localStorage
        const productosParaPedido = []; // Arreglo para almacenar productos del pedido
        for (const item of carrito) {
          const carritoProducto = {
            Id_Producto: item.Id_Producto,
            Id_Cliente: clienteId,
            Can_Producto: item.Can_Producto,
          };
  
          console.log('Carrito a enviar:', carritoProducto);
  
          // Aquí se envía la solicitud para agregar el producto al carrito
          const responseCarrito = await axios.post(URI_CARRITO, carritoProducto);
          if (responseCarrito.status !== 201) {
            throw new Error('Error al agregar el producto al carrito');
          }
  
          // Agregar el producto al arreglo para el pedido
          productosParaPedido.push({
            Id_Producto: item.Id_Producto,
            Can_Producto: item.Can_Producto,
          });
        }
  
        // Crear el pedido para cada producto en el carrito
        for (const producto of productosParaPedido) {
          const nuevoPedido = {
            Id_Cliente: clienteId, // Asegúrate de enviar el Id_Cliente
            Id_Producto: producto.Id_Producto, // Solo el Id_Producto
            Fec_Pedido: new Date().toISOString(), // Fecha actual
            Est_Pedido: 'Pendiente', // Estado del pedido
            Val_Pedido: producto.Can_Producto * carrito.find(item => item.Id_Producto === producto.Id_Producto).Pre_Producto, // Calcula el total del producto
          };
          console.log("id",  producto);
  
          console.log('Pedido a enviar:', nuevoPedido);
          
          const responsePedido = await axios.post(URI_PEDIDO, nuevoPedido);
          if (responsePedido.status !== 201) {
            throw new Error('Error al crear el pedido');
          }
        
  
        Swal.fire({
          title: 'Información Enviada Exitosamente',
          text: 'Su pedido llegará pronto',
          icon: 'success',
        });
        setShowForm(false);
      }
      }
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al registrar el cliente o los productos del carrito.');
      console.error('Error al agregar al carrito:', error);
    }
  };
  
  
  
  


  
  return (
    <ModalOverlay>
      <Modal>
        <CloseButton onClick={() => setShowForm(false)}>&times;</CloseButton>
        <center>
        <StyledTitle>Completa tus Datos</StyledTitle>
        </center>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="Nom_Cliente"
            placeholder="Nombre"
            value={cliente.Nom_Cliente}
            onChange={handleChange}
          />
          {formErrors.Nom_Cliente && <ErrorMessage>{formErrors.Nom_Cliente}</ErrorMessage>}

          <Input
            type="email"
            name="Cor_Cliente"
            placeholder="Correo (opcional)" // Agregamos un campo opcional
            value={cliente.Cor_Cliente}
            onChange={handleChange}
          />

          <Input
            type="text"
            name="Tel_Cliente"
            placeholder="Teléfono"
            value={cliente.Tel_Cliente}
            onChange={handleChange}
          />
          {formErrors.Tel_Cliente && <ErrorMessage>{formErrors.Tel_Cliente}</ErrorMessage>}

          <Input
            type="text"
            name="Dir_Cliente"
            placeholder="Dependencia"
            value={cliente.Dir_Cliente}
            onChange={handleChange}
          />
          {formErrors.Dir_Cliente && <ErrorMessage>{formErrors.Dir_Cliente}</ErrorMessage>}

          <label>Tipo de Cliente:</label>
          <Select name="Tip_Cliente" value={cliente.Tip_Cliente} onChange={handleChange}>
            <option value="">Selecciona un tipo</option>
            <option value="Funcionario">Funcionario</option>
            <option value="Aprendiz">Aprendiz</option>
            <option value="Vigilante">Vigilante</option>
            <option value="Externo">Externo</option>
            <option value="Otro">Otro</option>
          </Select>
          {formErrors.Tip_Cliente && <ErrorMessage>{formErrors.Tip_Cliente}</ErrorMessage>}

          <Button type="submit">Confirmar Pedido</Button>
        </Form>
      </Modal>
    </ModalOverlay>
  );
};

export default ClienteForm;

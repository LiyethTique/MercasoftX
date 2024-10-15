import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

// Definición de las URIs
const URI_CLIENTE = process.env.REACT_APP_SERVER_BACK + '/cliente/';
const URI_CARRITO = process.env.REACT_APP_SERVER_BACK + '/carrito/'; // Cambia a la URI correcta para el carrito
const URI_PEDIDO = process.env.REACT_APP_SERVER_BACK + '/pedido/';
const URI_PEDIDO_PRODUCTO = process.env.REACT_APP_SERVER_BACK + '/pedidoProducto/';

// Componente ClienteForm
const ClienteForm = ({ setShowForm, setClienteData, carrito }) => {
  const [cliente, setCliente] = useState({
    Nom_Cliente: '',
    Cor_Cliente: '',
    Tel_Cliente: '',
    Dir_Cliente: '',
    Tip_Cliente: '',
  });

  const [formErrors, setFormErrors] = useState({});

  // Validar el formulario
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
        const productosParaPedido = [];
        for (const item of carrito) {
          const carritoProducto = {
            Id_Producto: item.Id_Producto,
            Id_Cliente: clienteId,
            Can_Producto: item.Can_Producto,
          };
  
          console.log('Carrito a enviar:', carritoProducto);
  
          // Enviar solicitud para agregar el producto al carrito
          const responseCarrito = await axios.post(URI_CARRITO, carritoProducto);
          if (responseCarrito.status !== 201) {
            throw new Error('Error al agregar el producto al carrito');
          }
  
          // Agregar el producto al arreglo para el pedido
          productosParaPedido.push({
            Id_Producto: item.Id_Producto,
            Can_Producto: item.Can_Producto,
            Pre_Producto: item.Pre_Producto,
          });
        }
  
        // Crear el pedido general
        const nuevoPedido = {
          Id_Cliente: clienteId,
          Fec_Pedido: new Date().toISOString(),
          Est_Pedido: 'Pendiente',
          Val_Pedido: productosParaPedido.reduce((total, producto) => total + producto.Can_Producto * producto.Pre_Producto, 0),
        };
  
        const responsePedido = await axios.post(URI_PEDIDO, nuevoPedido);
        if (responsePedido.status !== 201) {
          throw new Error('Error al crear el pedido');
        }
  
        const pedidoId = responsePedido.data.pedido?.Id_Pedido;
  
        // Enviar los productos a la tabla PedidoProducto
        for (const producto of productosParaPedido) {
          const pedidoProducto = {
            Id_Pedido: pedidoId,
            Id_Producto: producto.Id_Producto,
            Can_Producto: producto.Can_Producto,
          };
  
          console.log('PedidoProducto a enviar:', pedidoProducto);
  
          // Enviar la solicitud para agregar el producto a la tabla PedidoProducto
          const responsePedidoProducto = await axios.post(URI_PEDIDO_PRODUCTO, pedidoProducto);
          if (responsePedidoProducto.status !== 201) {
            throw new Error('Error al agregar el producto a la tabla PedidoProducto');
          }
        }
  
        Swal.fire({
          title: 'Pedido Confirmado Exitasomente',
          text: 'Su pedido llegará pronto...',
          icon: 'success',
        }).then(() => {
          // Vaciar el localStorage y redirigir a la página principal al cerrar la alerta
          localStorage.clear();
          window.location.replace('/');
        });
      }
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al registrar el cliente o los productos del carrito.');
      console.error('Error al agregar al carrito:', error);
    } finally {
      // Aseguramos que el formulario se cierre, tanto si hubo éxito o error
      setShowForm(false);
    }
  };
  
  
  

  // Estilos en línea
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '20px',
    width: '500px',
    maxWidth: '90%',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    animation: 'slide-down 0.3s ease-out',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'none',
    border: 'none',
    fontSize: '1.8rem',
    cursor: 'pointer',
    color: '#ff8c42',
    transition: 'color 0.3s ease',
    pointerEvents: 'auto', // Asegúrate de que se puedan registrar los eventos de clic
  };
  
  // Resto del código...
  

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const inputStyle = {
    padding: '12px 15px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none',
  };

  const selectStyle = {
    padding: '12px 15px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none',
  };

  const buttonStyle = {
    padding: '12px 20px',
    backgroundColor: '#ff8c42',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const errorMessageStyle = {
    color: 'red',
    fontSize: '0.875rem',
    marginBottom: '15px',
  };

  const titleStyle = {
    color: '#ff8c42',
    fontSize: '1.5rem',
    marginBottom: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <button style={closeButtonStyle} onClick={() => setShowForm(false)}>&times;</button>
        <center>
          <h2 style={titleStyle}>Completa tus Datos</h2>
        </center>
        <form style={formStyle} onSubmit={handleSubmit}>
          <input
            type="text"
            name="Nom_Cliente"
            placeholder="Nombre"
            value={cliente.Nom_Cliente}
            onChange={handleChange}
            style={inputStyle}
          />
          {formErrors.Nom_Cliente && <p style={errorMessageStyle}>{formErrors.Nom_Cliente}</p>}

          <input
            type="email"
            name="Cor_Cliente"
            placeholder="Correo (opcional)" // Agregamos un campo opcional
            value={cliente.Cor_Cliente}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="Tel_Cliente"
            placeholder="Teléfono"
            value={cliente.Tel_Cliente}
            onChange={handleChange}
            style={inputStyle}
          />
          {formErrors.Tel_Cliente && <p style={errorMessageStyle}>{formErrors.Tel_Cliente}</p>}

          <input
            type="text"
            name="Dir_Cliente"
            placeholder="Dependencia del Centro"
            title='Lugar donde te encuentres, solo se hacen envios dentro del Centro Agropecuario la Granja SENA'
            value={cliente.Dir_Cliente}
            onChange={handleChange}
            style={inputStyle}
          />
          {formErrors.Dir_Cliente && <p style={errorMessageStyle}>{formErrors.Dir_Cliente}</p>}

          <select
            name="Tip_Cliente"
            value={cliente.Tip_Cliente}
            onChange={handleChange}
            style={selectStyle}
          >
                <option value="">Selecciona un tipo</option>
            <option value="Funcionario">Funcionario</option>
            <option value="Aprendiz">Aprendiz</option>
            <option value="Vigilante">Vigilante</option>
            <option value="Externo">Externo</option>
            <option value="Otro">Otro</option>

          </select>
          {formErrors.Tip_Cliente && <p style={errorMessageStyle}>{formErrors.Tip_Cliente}</p>}

          <button type="submit" style={buttonStyle} >Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default ClienteForm;

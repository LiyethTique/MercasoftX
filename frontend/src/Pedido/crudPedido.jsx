import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormPedido from './formPedido.jsx';
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';
import WriteTable from '../Tabla/Data-Table';
import ModalForm from '../Model/Model';
import { IoTrash, IoPencil } from "react-icons/io5";
import { Button } from 'react-bootstrap';

const token = localStorage.getItem('token'); // Obtener el token una vez

const URI = process.env.REACT_APP_SERVER_BACK + '/pedido/';
const URI_PRODUCTOS = process.env.REACT_APP_SERVER_BACK + '/pedidoProducto/';
const URI_DETALLE_PRODUCTO = process.env.REACT_APP_SERVER_BACK + '/producto/';
const URI_CLIENTES = process.env.REACT_APP_SERVER_BACK + '/cliente/';

const CrudPedido = () => {
  const [pedidoList, setPedidoList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [pedido, setPedido] = useState(null);
  const [Idpedido, setIdpedido] = useState(null);
  const moduleName = "Gestionar Pedidos";

  useEffect(() => {
    getAllPedidos();
  }, []);

  const getAllPedidos = async () => {
    try {
      const respuesta = await axios.get(URI);
      const pedidosWithClientes = await Promise.all(respuesta.data.map(async pedido => {
        const productos = await getProductosByPedido(pedido.Id_Pedido);
        const cliente = await getClienteById(pedido.Id_Cliente);
        return { ...pedido, productos, Nom_Cliente: cliente.Nom_Cliente, Dir_Cliente: cliente.Dir_Cliente };
      }));
      setPedidoList(pedidosWithClientes);
    } catch (error) {
      handleError(error, "No se pudieron obtener los pedidos. Por favor, verifica tu conexión o intenta más tarde.");
    }
  };

  const getClienteById = async (id) => {
    try {
      const response = await axios.get(`${URI_CLIENTES}${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching cliente with id ${id}:`, error);
      return { Nom_Cliente: 'Desconocido', Dir_Cliente: 'No disponible' };
    }
  };

  const getProductosByPedido = async (Id_Pedido) => {
    try {
      const response = await axios.get(`${URI_PRODUCTOS}${Id_Pedido}`);
      return await Promise.all(response.data.map(async producto => {
        const detalleResponse = await axios.get(`${URI_DETALLE_PRODUCTO}${producto.Id_Producto}`);
        return { ...producto, Nom_Producto: detalleResponse.data.Nom_Producto };
      }));
    } catch (error) {
      console.error(`Error fetching productos for pedido ${Id_Pedido}:`, error);
      return [];
    }
  };

  const handleShowForm = () => {
    setPedido(null);
    setButtonForm('Enviar');
    setIsModalOpen(true);
  };

  const hasSpaces = (data) => {
    // Verifica si hay algún campo en el objeto 'data' que esté vacío o contenga solo espacios.
    return Object.values(data).some(value => typeof value === 'string' && value.trim().length === 0);
  };

  const hasChanges = (pedidoData) => {
    // Asegúrate de que 'pedido' sea la variable que contiene el pedido existente.
    if (!pedido) return true; // Si no hay un pedido existente, consideramos que hay cambios

    // Comparamos cada campo del pedidoData con el pedido existente
    return (
      pedidoData.Fec_Pedido !== pedido.Fec_Pedido ||
      pedidoData.Est_Pedido !== pedido.Est_Pedido ||
      pedidoData.Val_Pedido !== pedido.Val_Pedido
    );
  };



  const handleSubmitPedido = async (pedidoData) => {
    console.log("Datos del pedido:", pedidoData); // Para depuración
    if (hasSpaces(pedidoData)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se permiten campos vacíos o que contengan solo espacios.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    if (buttonForm === 'Actualizar' && !hasChanges(pedidoData)) {
      Swal.fire({
        icon: 'warning',
        title: 'Sin cambios',
        text: 'Debes realizar cambios en al menos un campo para actualizar.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    try {
      console.log("pedidoData: ", pedidoData)
      console.log("pedidoData: ", Idpedido)
      const url = buttonForm === 'Actualizar' ? `${URI}${Idpedido}` : URI;
      const headers = {
        headers: {
          Authorization: `Bearer ${token}` // Asegurarse de enviar el token de autorización
        }
      };
      const res = await (buttonForm === 'Actualizar' ? axios.put(url, pedidoData, headers) : axios.post(URI, pedidoData, headers));
      console.log(res);
      Swal.fire("Éxito", `Pedido ${buttonForm === 'Actualizar' ? 'actualizado' : 'creado'} correctamente`, "success");
      setIsModalOpen(false);
      getAllPedidos();
    } catch (error) {
      handleError(error, "No se pudo enviar el pedido. Asegúrate de que todos los campos estén correctos y prueba de nuevo.");
    }
  };


  const getPedido = async (id) => {
    try {
      setIdpedido(id);
      const response = await axios.get(`${URI}${id}`);
      setPedido(response.data);
      setButtonForm('Actualizar');
      setIsModalOpen(true);
    } catch (error) {
      handleError(error, "Error al intentar obtener el pedido. Por favor, verifica que el pedido exista.");
    }
  };

  const deletePedido = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Si eliminas este pedido, se borrará de la base de datos por completo.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${URI}${id}`);
        Swal.fire('Eliminado', 'El pedido ha sido eliminado correctamente.', 'success');
        getAllPedidos();
      } catch (error) {
        handleError(error, "No se pudo eliminar el pedido. Verifica que el pedido exista y prueba nuevamente.");
      }
    } else {
      Swal.fire('Cancelado', 'El pedido no fue eliminado', 'info');
    }
  };

  const handleError = (error, defaultMessage) => {
    console.error(error);
    const errorMessage = error.response?.data?.message || defaultMessage;
    Swal.fire("Error", errorMessage, "error");
  };

  // Función para formatear el valor con comas (separador de miles)
  const formatNumber = (value) => {
    return new Intl.NumberFormat('es-CO').format(value);
  };

  const titles = ['Código', 'Fecha', 'Nombre del Cliente', 'Lugar de entrega', 'Estado', 'Valor', 'Acciones', 'Productos Pedidos'];

  const data = pedidoList.map(pedido => [
    pedido.Id_Pedido,
    pedido.Fec_Pedido,
    pedido.Nom_Cliente,
    pedido.Dir_Cliente,
    pedido.Est_Pedido,
    formatNumber(pedido.Val_Pedido), // Aplica el formato aquí
    <div key={pedido.Id_Pedido} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <a
        href="#!"
        className="btn-custom me-2"
        onClick={() => getPedido(pedido.Id_Pedido)}
        title="Editar"
        style={{ pointerEvents: pedidoList.length > 0 ? 'auto' : 'none', opacity: pedidoList.length > 0 ? 1 : 0.5 }}
      >
        <IoPencil size={20} color="blue" />
      </a>
      <a
        href="#!"
        className="btn-custom"
        onClick={() => deletePedido(pedido.Id_Pedido)}
        title="Borrar"
        style={{ pointerEvents: pedidoList.length > 0 ? 'auto' : 'none', opacity: pedidoList.length > 0 ? 1 : 0.5 }}
      >
        <IoTrash size={20} color="red" />
      </a>
    </div>,
    <div className="productos-asociados">
      <h5></h5>
      <ul>
        {pedido.productos && pedido.productos.length > 0 ? (
          pedido.productos.map((producto, index) => (
            <li key={index}>
              {producto.Nom_Producto} - Cantidad: {producto.Can_Producto}
            </li>
          ))
        ) : (
          <li>No hay productos asociados.</li>
        )}
      </ul>
    </div>
  ]);

  return (
    <>
      <Sidebar />
      <div className="container mt-4">
        <center>
          <h1>{moduleName}</h1>
        </center>
        <div className="d-flex justify-content-between mb-3">

        </div>

        <WriteTable titles={titles} data={data} moduleName={moduleName} />

        <ModalForm
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setPedido(null); setButtonForm('Enviar'); }}
          title={buttonForm === 'Actualizar' ? "Actualizar Pedido" : "Agregar Pedido"}
        >
          <FormPedido
            buttonForm={buttonForm}
            pedido={pedido}
            onSubmit={handleSubmitPedido}
          />
        </ModalForm>
      </div>
    </>
  );
};

export default CrudPedido;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormPedido from '../Pedido/formPedido';
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';
import WriteTable from '../Tabla/Data-Table';
import ModalForm from '../Model/Model';

const URI = process.env.REACT_APP_SERVER_BACK + '/pedido/';

const CrudPedido = () => {
  const [pedidoList, setPedidoList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [pedido, setPedido] = useState(null);
  const moduleName = "Gestionar Pedidos"; // Nombre del módulo

  useEffect(() => {
    getAllPedidos();
  }, []);

  const getAllPedidos = async () => {
    try {
      const respuesta = await axios.get(URI);
      if (Array.isArray(respuesta.data)) {
        setPedidoList(respuesta.data);
      } else {
        console.error("Unexpected response format:", respuesta.data);
        setPedidoList([]);
      }
    } catch (error) {
      console.error("Error fetching pedidos:", error);
      Swal.fire("Error", error.response?.data?.message || "Error al obtener los Pedidos", "error");
    }
  };

  const handleShowForm = () => {
    setPedido(null); // Limpiar el pedido actual para un nuevo formulario
    setButtonForm('Enviar'); // Cambiar el botón a 'Enviar' para nuevos pedidos
    setIsModalOpen(true); // Mostrar el modal
  };

  const handleSubmitPedido = async (pedidoData) => {
    try {
      if (buttonForm === 'Actualizar') {
        // Actualizar pedido existente
        await axios.put(`${URI}${pedidoData.Id_Pedido}`, pedidoData);
        Swal.fire("Éxito", "Pedido actualizado correctamente", "success");
      } else {
        // Crear nuevo pedido
        await axios.post(URI, pedidoData);
        Swal.fire("Éxito", "Pedido creado correctamente", "success");
      }
      setIsModalOpen(false); // Cerrar el modal
      getAllPedidos(); // Refrescar la lista de pedidos
    } catch (error) {
      console.error("Error al enviar el pedido:", error);
      Swal.fire("Error", error.response?.data?.message || "Error al enviar el pedido", "error");
    }
  };

  // Definir la función getPedido
  const getPedido = async (id) => {
    try {
      const response = await axios.get(`${URI}${id}`);
      setPedido(response.data); // Guardar los datos del pedido para editar
      setButtonForm('Actualizar'); // Cambiar el texto del botón a 'Actualizar'
      setIsModalOpen(true); // Abrir el modal para editar
    } catch (error) {
      console.error("Error al obtener el pedido:", error);
      Swal.fire("Error", "Error al obtener el pedido para editar", "error");
    }
  };

  const deletePedido = async (id) => {
    // Mostrar la alerta de confirmación
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

    // Si el usuario confirma la eliminación
    if (result.isConfirmed) {
      try {
        await axios.delete(`${URI}${id}`);
        Swal.fire('Eliminado', 'El pedido ha sido eliminado correctamente.', 'success');
        getAllPedidos(); // Refrescar la lista de pedidos
      } catch (error) {
        console.error("Error al eliminar el pedido:", error);
        Swal.fire("Error", "Error al eliminar el pedido", "error");
      }
    } else {
      // Si el usuario cancela, mostrar un mensaje de cancelación
      Swal.fire('Cancelado', 'El pedido no fue eliminado', 'info');
    }
  };

  const titles = ['Código', 'Fecha Pedido', 'ID Cliente', 'Estado Pedido', 'Valor Pedido', 'Acciones'];
  const data = pedidoList.map(pedido => [
    pedido.Id_Pedido,
    pedido.Fec_Pedido,
    pedido.Id_Cliente,
    pedido.Est_Pedido,
    pedido.Val_Pedido,
    <div key={pedido.Id_Pedido}>
      <button className="btn btn-warning me-2" onClick={() => getPedido(pedido.Id_Pedido)} title="Editar">
        <img src="/pencil-square.svg" alt="Editar" style={{ width: '24px', height: '24px' }} />
      </button>
      <button className="btn btn-danger" onClick={() => deletePedido(pedido.Id_Pedido)} title="Borrar">
        <img src="/archive.svg" alt="Borrar" style={{ width: '24px', height: '24px' }} />
      </button>
    </div>
  ]);

  return (
    <>
      <Sidebar />
      <div className="container mt-4">
        <center><h1>{moduleName}</h1></center>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-success d-flex align-items-center" onClick={handleShowForm}>
            <img src="/plus-circle (1).svg" alt="Agregar Pedido" style={{ width: '20px', height: '20px', marginRight: '8px', filter: 'invert(100%)' }} />
            Registrar
          </button>
        </div>
        <WriteTable titles={titles} data={data} moduleName={moduleName} />
        <ModalForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={buttonForm === 'Actualizar' ? 'Actualizar Pedido' : 'Agregar Pedido'}
          onSubmit={() => {
            const form = document.querySelector('form');
            if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
          }}
        >
          <FormPedido
            buttonForm={buttonForm}
            pedido={pedido}
            URI={URI}
            updateTextButton={setButtonForm}
            setIsFormVisible={setIsModalOpen}
            onSubmit={handleSubmitPedido}
          />
        </ModalForm>
      </div>
    </>
  );
};

export default CrudPedido;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormPedido from '../Pedido/formPedido';
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';
import WriteTable from '../Tabla/Data-Table';
import ModalForm from '../Model/Model';

const URI = (process.env.SERVER_BACK || 'http://localhost:3002') + '/pedido/';

const CrudPedido = () => {
  const [pedidoList, setPedidoList] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    getAllPedido();
  }, []);

  const getAllPedido = async () => {
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

  const getPedido = async (Id_Pedido) => {
    setButtonForm('Actualizar');
    try {
      const respuesta = await axios.get(`${URI}${Id_Pedido}`);
      setPedido(respuesta.data);
      setIsModalOpen(true);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al obtener el Pedido", "error");
    }
  };

  const handleSubmitPedido = async (data) => {
    try {
      if (buttonForm === 'Actualizar') {
        await axios.put(`${URI}${pedido.Id_Pedido}`, data);
        Swal.fire("Actualizado!", "El pedido ha sido actualizado.", "success");
      } else {
        await axios.post(URI, data);
        Swal.fire("Creado!", "El pedido ha sido creado.", "success");
      }
      getAllPedido();
      setIsModalOpen(false);
      setButtonForm('Enviar');
      setPedido(null);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al guardar el Pedido", "error");
    }
  };

  const deletePedido = async (Id_Pedido) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${URI}${Id_Pedido}`);
          Swal.fire("¡Borrado!", "El registro ha sido borrado.", "success");
          getAllPedido();
        } catch (error) {
          Swal.fire("Error", error.response?.data?.message || "Error al eliminar el Pedido", "error");
        }
      }
    });
  };

  const handleShowForm = () => {
    setButtonForm('Enviar');
    setPedido(null);
    setIsModalOpen(true);
  };

  const titles = ['Código', 'Fecha Pedido', 'ID Cliente', 'Estado Pedido', 'Valor Pedido', 'Acciones'];
  const data = pedidoList.map(pedido => [
    pedido.Id_Pedido,
    pedido.Fec_Pedido,
    pedido.Id_Cliente,
    pedido.Est_Pedido,
    pedido.Val_Pedido,
    <div key={pedido.Id_Pedido}>
      <button 
        className="btn btn-warning me-2" 
        onClick={() => getPedido(pedido.Id_Pedido)}
        title="Editar"
      >
        <img 
          src="/pencil-square.svg" 
          alt="Editar" 
          style={{ width: '24px', height: '24px' }}
        />
      </button>
      <button 
        className="btn btn-danger" 
        onClick={() => deletePedido(pedido.Id_Pedido)}
        title="Borrar"
      >
        <img 
          src="/archive.svg" 
          alt="Borrar" 
          style={{ width: '24px', height: '24px' }}
        />
      </button>
    </div>
  ]);

  const moduleName = "Gestionar Pedidos"; // Nombre del módulo

  return (
    <>
      <Sidebar />
      <div className="container mt-4">
        <center>
          <h1>{moduleName}</h1>
        </center>
        
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-success d-flex align-items-center" onClick={handleShowForm}>   
            <img
              src="/plus-circle (1).svg"
              alt="Add Icon"
              style={{ width: '20px', height: '20px', marginRight: '8px', filter: 'invert(100%)' }}
            />
            Registrar
          </button>
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from '../Sidebar/Sidebar';

const URI_PRODUCTO = process.env.REACT_APP_SERVER_BACK + '/producto/';
const URI_CARRITO = process.env.REACT_APP_SERVER_BACK + '/carrito/';

const CrudCarritoAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [idProducto, setIdProducto] = useState('');

  // Obtener todos los productos al cargar el componente
  useEffect(() => {
    const fetchDatos = async () => {
      try {
        // Obtener productos
        const productosResponse = await axios.get(URI_PRODUCTO);
        setProductos(productosResponse.data);

        // Puedes eliminar esta parte si no se usa el carrito del usuario
        // const carritoResponse = await axios.get(URI_CARRITO_USER);
        // setCarrito(carritoResponse.data);

      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchDatos();
  }, []);

  // Función para agregar un producto al carrito
  const agregarAlCarrito = async () => {
    if (!idProducto) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar un producto',
      });
      return;
    }

    try {
      const response = await axios.post(URI_CARRITO, {
        Id_Producto: idProducto,
        Can_Producto: 1, // Puedes ajustar esto según tus necesidades
        Id_Cliente: null // Ajusta según el cliente actual o usa un valor predeterminado
      });

      const productoAgregado = response.data; // Ajusta según la respuesta del backend

      // Añadir producto con datos adicionales al carrito
      const producto = productos.find(p => p.Id_Producto === idProducto);
      if (producto) {
        setCarrito([...carrito, { ...productoAgregado, ...producto }]);
      } else {
        setCarrito([...carrito, productoAgregado]);
      }

      Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: 'El producto se ha agregado al carrito exitosamente',
      });
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al agregar el producto al carrito',
      });
    }
  };

  // Función para eliminar un producto del carrito
  const eliminarDelCarrito = async (idCarrito) => {
    try {
      await axios.delete(`${URI_CARRITO}${idCarrito}`);
      setCarrito(carrito.filter((item) => item.Id_Carrito !== idCarrito));
      Swal.fire({
        icon: 'success',
        title: 'Producto eliminado',
        text: 'El producto ha sido eliminado del carrito',
      });
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al eliminar el producto del carrito',
      });
    }
  };

  return (
    <>
      <Sidebar />
      <div className="container mt-4">
        <h2>Administrar Carrito</h2>

        {/* Formulario para agregar productos al carrito */}
        <div className="card p-3 mb-4">
          <h5>Agregar Producto al Carrito</h5>
          <div className="form-group mb-3">
            <label htmlFor="producto">Producto</label>
            <select
              id="producto"
              className="form-control"
              value={idProducto}
              onChange={(e) => setIdProducto(e.target.value)}
            >
              <option value="">Seleccione un producto</option>
              {productos.map((producto) => (
                <option key={producto.Id_Producto} value={producto.Id_Producto}>
                  {producto.Nom_Producto}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" onClick={agregarAlCarrito}>
            Agregar al Carrito
          </button>
        </div>

        {/* Recuadros de productos en el carrito */}
        <h5>Productos en el Carrito</h5>
        <div className="row">
          {carrito.length > 0 ? (
            carrito.map((item) => (
              <div className="col-md-4 mb-3" key={item.Id_Carrito}>
                <div className="card">
                  <img src={item.Ima_Producto} className="card-img-top" alt={item.Nom_Producto} />
                  <div className="card-body">
                    <h5 className="card-title">{item.Nom_Producto}</h5>
                    <p className="card-text">Precio: ${item.Pre_Producto}</p>
                    <p className="card-text">Cantidad en Existencia: {item.Exi_Producto}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => eliminarDelCarrito(item.Id_Carrito)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No hay productos en el carrito</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CrudCarritoAdmin;

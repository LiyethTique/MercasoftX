import React, { useEffect, useState } from 'react';
// import FormularioCRUD from '../components/FormularioCRUD';
import { obtenerRegistros, crearRegistro, actualizarRegistro, eliminarRegistro } from '../services/apiService';

const ProductoPage = () => {
  const [productos, setProductos] = useState([]);
  const campos = ['nombre', 'precio', 'categoria'];

  useEffect(() => {
    const fetchData = async () => {
      const data = await obtenerRegistros('productos');
      setProductos(data);
    };
    fetchData();
  }, []);

  const handleCrear = async (nuevoProducto) => {
    const productoCreado = await crearRegistro('productos', nuevoProducto);
    setProductos([...productos, productoCreado]);
  };

  const handleActualizar = async (productoActualizado) => {
    await actualizarRegistro('productos', productoActualizado.id, productoActualizado);
    setProductos(productos.map((prod) => (prod.id === productoActualizado.id ? productoActualizado : prod)));
  };

  const handleEliminar = async (id) => {
    await eliminarRegistro('productos', id);
    setProductos(productos.filter((prod) => prod.id !== id));
  };

  return (
    <FormularioCRUD
      entidad="Producto"
      campos={campos}
      registros={productos}
      crearRegistro={handleCrear}
      actualizarRegistro={handleActualizar}
      eliminarRegistro={handleEliminar}
    />
  );
};

export default ProductoPage;
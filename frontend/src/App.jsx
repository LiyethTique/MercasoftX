import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

import Carrito from './Carrito/crudCarrito.jsx'
import Categoria from './Categoria/crudCategoria.jsx'
import Cliente from './Cliente/crudCliente.jsx'
import Entrada from './Entrada/crudEntrada.jsx'
import Pedido from './Pedido/crudPedido.jsx'
import PedidoProducto from './PedidoProducto/crudPedidoProducto.jsx'
import Producto from './Producto/crudProducto.jsx'
import Responsable from './Responsable/crudResponsable.jsx'
import Traslado from './Traslado/crudTraslado.jsx'
import Unidad from './Unidad/crudUnidad.jsx'
import Venta from './Venta/crudVenta.jsx'
import Auth from './Auth/Auth';
import Home from './Home/Home';

const URI_AUTH = process.env.SERVER_BACK + '/auth';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userMercasoft'));
    if (!user) {
      setIsAuth(false);
    } else {
      axios.get(`${URI_AUTH}/verify`, {
        headers: { Authorization: `Bearer ${user.tokenUser}` }
      }).then(response => {
        if (response.status === 200) {
          setIsAuth(true);
        }
      }).catch(() => {
        setIsAuth(false);
      });
    }
  }, []);

  const logOutUser = () => {
    localStorage.removeItem('userMercasoft');
    setIsAuth(false);
    navigate('/auth');
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/categoria" element={<Categoria />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/entrada" element={<Entrada />} />
        <Route path="/pedido" element={<Pedido />} />
        <Route path="/pedidoproducto" element={<PedidoProducto />} />
        <Route path="/producto" element={<Producto />} />
        <Route path="/responsable" element={<Responsable />} />
        <Route path="/traslado" element={<Traslado />} />
        <Route path="/unidad" element={<Unidad />} />
        <Route path="/venta" element={<Venta />} />
        <Route path="/home" element={<Home />} />
        {/* {isAuth ? (
          <>
            {/* <Route path="/Ventas" element={<CrudVenta />} />
            <Route path="/Traslados" element={<Traslados />} /> */}
          {/* </> */}
        {/* ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
        {!isAuth && <Route path="/auth" element={<Auth />} />} */} */
      </Routes>
    </>
  );
}

export default App;

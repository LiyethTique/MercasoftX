import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

import Carrito from './Carrito/crudCarrito.jsx';
import Categoria from './Categoria/crudCategoria.jsx';
import Cliente from './Cliente/crudCliente.jsx';
import Entrada from './Entrada/crudEntrada.jsx';
import Pedido from './Pedido/crudPedido.jsx';
import PedidoProducto from './PedidoProducto/crudPedidoProducto.jsx';
import Producto from './Producto/crudProducto.jsx';
import Responsable from './Responsable/crudResponsable.jsx';
import Traslado from './Traslado/crudTraslado.jsx';
import Unidad from './Unidad/crudUnidad.jsx';
import Venta from './Venta/crudVenta.jsx';
import Auth from './Auth/Auth';
import Home from './Home/Home';

const URI_AUTH = `${process.env.SERVER_BACK}/auth`;

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userMercasoft'));
    if (user && user.tokenUser) {
      axios.post(`${URI_AUTH}/verify`, {}, {
        headers: { Authorization: `Bearer ${user.tokenUser}` }
      }).then(response => {
        if (response.status === 200) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      }).catch(() => {
        setIsAuth(false);
      });
    } else {
      setIsAuth(false);
    }
  }, []);

  const logOutUser = () => {
    localStorage.removeItem('userMercasoft');
    setIsAuth(false);
    navigate('/auth');
  };

  return (
    <>
      <nav>
        {isAuth && <button onClick={logOutUser}>Logout</button>}
      </nav>
      <Routes>
        <Route path="/" element={isAuth ? <Navigate to="/home" /> : <Auth />} />
        <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/" />} />
        <Route path="/carrito" element={isAuth ? <Carrito /> : <Navigate to="/" />} />
        <Route path="/categoria" element={isAuth ? <Categoria /> : <Navigate to="/" />} />
        <Route path="/cliente" element={isAuth ? <Cliente /> : <Navigate to="/" />} />
        <Route path="/entrada" element={isAuth ? <Entrada /> : <Navigate to="/" />} />
        <Route path="/pedido" element={isAuth ? <Pedido /> : <Navigate to="/" />} />
        <Route path="/pedidoproducto" element={isAuth ? <PedidoProducto /> : <Navigate to="/" />} />
        <Route path="/producto" element={isAuth ? <Producto /> : <Navigate to="/" />} />
        <Route path="/responsable" element={isAuth ? <Responsable /> : <Navigate to="/" />} />
        <Route path="/traslado" element={isAuth ? <Traslado /> : <Navigate to="/" />} />
        <Route path="/unidad" element={isAuth ? <Unidad /> : <Navigate to="/" />} />
        <Route path="/venta" element={isAuth ? <Venta /> : <Navigate to="/" />} />
        {isAuth && (
          <>
            {/* Agrega las rutas adicionales solo si el usuario está autenticado */}
            <Route path="/ventas" element={<Venta />} />
            <Route path="/traslados" element={<Traslado />} />
          </>
        )}
        {!isAuth && <Route path="/auth" element={<Auth />} />}
        <Route path="*" element={<Navigate to={isAuth ? "/home" : "/"} />} />
      </Routes>
    </>
  );
}

export default App;
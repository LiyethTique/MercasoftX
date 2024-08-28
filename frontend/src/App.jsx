import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, Navigate, BrowserRouter } from 'react-router-dom';
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
import Auth from './Auth/auth.jsx';
import Home from './Home/Home.jsx';


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
    {/* <BrowserRouter> */}
      <Routes>
            <Route path='/' element={<Auth />} />
            <Route path='/home' element={<Home/>} />
            <Route path='/carrito' element={<Carrito />} />
            <Route path='/Categoria' element={<Categoria />} />
            <Route path='/cliente' element={<Cliente />} />
            <Route path='/entrada' element={<Entrada />} />
            <Route path='/pedido' element={<Pedido />} />
            <Route path='/PedidoProducto' element={<PedidoProducto />} />
            <Route path='/Producto' element={<Producto />} />
            <Route path='/Responsable' element={<Responsable />} />
            <Route path='/Traslado' element={<Traslado />} />
            <Route path='/Unidad' element={<Unidad />} />
            <Route path='/Venta' element={<Venta />} />
      </Routes>
    {/* </BrowserRouter> */}
    </>
  );
}

export default App;

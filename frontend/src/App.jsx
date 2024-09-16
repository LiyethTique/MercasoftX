import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import Home from './Home/Home.jsx';
import Imagen from './raiz/Imagen.jsx';
import TeamPresentation from './contact/equipo.jsx';
import ContactPage from './contact/imageCarrousel.jsx';
import Login from './iniciarsesion/IniciarSesion.jsx';
import Auth from './registrar/registrar.jsx';
import CarritoProducto from './CarritoProducto/crudCarritoProducto.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/categoria" element={<Categoria />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/entrada" element={<Entrada />} />
        <Route path="/pedido" element={<Pedido />} />
        <Route path="/pedidoProducto" element={<PedidoProducto />} />
        <Route path="/producto" element={<Producto />} />
        <Route path="/responsable" element={<Responsable />} />
        <Route path="/traslado" element={<Traslado />} />
        <Route path="/unidad" element={<Unidad />} />
        <Route path="/venta" element={<Venta />} />
        <Route path="/team-presentation" element={<TeamPresentation />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/carritoproducto" element={<CarritoProducto />} /> {/* Corrección aquí */}
      </Routes>

      {/* Aquí agregas el modal */}
      {/* <ModalForms /> */}
    </>
  );
}

export default App;

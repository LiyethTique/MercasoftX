import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Carrito from './Carrito/crudCarrito.jsx';
// import area from './area/area.jsx';
import Cliente from './Cliente/crudCliente.jsx';
import Entrada from './Entrada/crudEntrada.jsx';
import Pedido from './Pedido/crudPedido.jsx';
import PedidoProducto from './PedidoProducto/crudPedidoProducto.jsx';
import Producto from './Producto/crudProducto.jsx';
import Responsable from './Responsable/crudResponsable.jsx';
import Traslado from './Traslado/crudTraslado.jsx';
import Unidad from './Unidad/crudUnidad.jsx';
import Venta from './Venta/crudVenta.jsx';
import TeamPresentation from './contact/equipo.jsx';
import ContactPage from './contact/imageCarrousel.jsx';
import Login from './iniciarsesion/IniciarSesion.jsx';
import Auth from './registrar/registrar.jsx';
import CatalogPage from './components/catalogPage/catalogPage.jsx';

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Verifica si hay un token guardado en localStorage
};

// Componente para proteger las rutas
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/team-presentation" element={<TeamPresentation />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Auth />} />

        {/* Rutas protegidas */}
        <Route 
          path="/carrito" 
          element={
            <ProtectedRoute>
              <Carrito />
            </ProtectedRoute>
          } 
        />
        {/* <Route 
          path="/area" 
          element={
            <ProtectedRoute>
              <area />
            </ProtectedRoute>
          } 
        /> */}
        <Route 
          path="/cliente" 
          element={
            <ProtectedRoute>
              <Cliente />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/entrada" 
          element={
            <ProtectedRoute>
              <Entrada />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/pedido" 
          element={
            <ProtectedRoute>
              <Pedido />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/pedidoProducto" 
          element={
            <ProtectedRoute>
              <PedidoProducto />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/producto" 
          element={
            <ProtectedRoute>
              <Producto />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/responsable" 
          element={
            <ProtectedRoute>
              <Responsable />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/traslado" 
          element={
            <ProtectedRoute>
              <Traslado />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/unidad" 
          element={
            <ProtectedRoute>
              <Unidad />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/venta" 
          element={
            <ProtectedRoute>
              <Venta />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default App;
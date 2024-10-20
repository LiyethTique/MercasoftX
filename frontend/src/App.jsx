import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { default as jwt_decode } from 'jwt-decode';

// Importación de componentes
import Carrito from './Carrito/crudCarrito.jsx';
import CrudPedido from './Pedido/crudPedido.jsx';
import ForCliente from './Cliente/formCliente.jsx';
import Cliente from './Cliente/crudCliente.jsx';
import Entrada from './Entrada/crudEntrada.jsx';
import PedidoProducto from './PedidoProducto/crudPedidoProducto.jsx';
import Producto from './Producto/crudProducto.jsx';
import Responsable from './Responsable/crudResponsable.jsx';
import Traslado from './Traslado/crudTraslado.jsx';
import Unidad from './Unidad/crudUnidad.jsx';
import Venta from './Venta/crudVenta.jsx';
import TeamPresentation from './contact/equipo.jsx';
import ContactPage from './contact/imageCarrousel.jsx';
import Login from './iniciarsesion/IniciarSesion.jsx';
import RecuperarContrasena from './Recuperar Contraseña/recuperar_contraseña.jsx';
import ResetPassword from './Recuperar Contraseña/resetPassword.jsx';
import CatalogPage from './components/catalogPage/catalogPage.jsx';
import UsuarioAdmin from './UsuarioAdmin/crudUsuario.jsx';
import Area from './Area/crudArea.jsx';
import NotFound from './error404/NotFound.jsx'; // Importar el componente NotFound

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Verifica si hay un token en localStorage
};

// Función para verificar si el usuario es administrador
const isAdmin = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decodedToken = jwt_decode(token); // Usamos jwt_decode para decodificar el token
    return decodedToken.Tip_Responsable === 'Administrador'; // Verifica si el rol es "Administrador"
  } catch (error) {
    console.error('Error al decodificar el token', error);
    return false;
  }
};

// Componente para proteger las rutas
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />; // Redirige al login si no está autenticado
  }
  return children;
};

// Componente para proteger las rutas solo para administradores
const AdminProtectedRoute = ({ children }) => {
  if (!isAdmin()) {
    console.log("Acceso denegado. Redirigiendo a /cliente"); // Log de acceso denegado
    return <Navigate to="/cliente" replace />;
  }
  return children;
};

function App() {
  return (
    <>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<CatalogPage />} />
        <Route path="/team-presentation" element={<TeamPresentation />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/ForCliente" element={<ForCliente />} />

        {/* Rutas protegidas */}
        <Route path='/cliente' element={<ProtectedRoute><Cliente/></ProtectedRoute>}></Route>
        <Route path="/entrada" element={<ProtectedRoute><Entrada /></ProtectedRoute>} />
        <Route path="/pedido" element={<ProtectedRoute><CrudPedido /></ProtectedRoute>} />
        <Route path="/pedidoProducto" element={<ProtectedRoute><PedidoProducto /></ProtectedRoute>} />
        <Route path="/producto" element={<ProtectedRoute><Producto /></ProtectedRoute>} />
        <Route path="/traslado" element={<ProtectedRoute><Traslado /></ProtectedRoute>} />
        <Route path="/unidad" element={<ProtectedRoute><Unidad /></ProtectedRoute>} />
        <Route path="/venta" element={<ProtectedRoute><Venta /></ProtectedRoute>} />
        <Route path="/area" element={<ProtectedRoute><Area /></ProtectedRoute>} />

        {/* Rutas protegidas solo para administradores */}
        <Route path="/responsable" element={<AdminProtectedRoute><Responsable /></AdminProtectedRoute>} />
        <Route path="/users" element={<AdminProtectedRoute><UsuarioAdmin /></AdminProtectedRoute>} />

        {/* Ruta "catch-all" para manejar rutas inexistentes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

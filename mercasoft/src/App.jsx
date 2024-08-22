<<<<<<< HEAD
import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import crudEntrada from './entrada/crudEntrada';
import crudPedido from './pedido/crudPedido';

// Usa import.meta.env para acceder a la variable de entorno
const URI_USUARIO = import.meta.env.VITE_SERVER_BACK || 'https://localhost:3001';

console.log(URI_USUARIO);
=======
import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './Home/Home';
import CrudVenta from './ventas/crudVenta.jsx';
import Traslados from "./Traslados/Traslados.jsx";
import Auth from './Auth/auth';

const URI_AUTH = process.env.SERVER_BACK + '/auth';
>>>>>>> main

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

<<<<<<< HEAD
=======
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

>>>>>>> main
  return (
    <>
      <nav>
        <ul>
          <li>
<<<<<<< HEAD
            <Link to="/entrada">Entrada</Link>
          </li>
          <li>
            <Link to="/pedido">Pedido</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/entrada' element={<crudEntrada />} />
        <Route path='/pedido' element={<crudPedido />} />
=======
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/Traslados">Traslados</Link>
          </li>
          <li>
            <Link to="/Ventas">Ventas</Link>
          </li>
          {!isAuth && (
            <li>
              <Link to="/auth">Sesión</Link>
            </li>
          )}
          {isAuth && (
            <li>
              <button onClick={logOutUser} className="btn btn-secundary">
                <i className="fa-solid fa-door-closed">Cerrar Sesión</i>
              </button>
            </li>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        {isAuth ? (
          <>
            <Route path="/Ventas" element={<CrudVenta />} />
            <Route path="/Traslados" element={<Traslados />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
        {!isAuth && <Route path="/auth" element={<Auth />} />}
>>>>>>> main
      </Routes>
    </>
  );
}

export default App;

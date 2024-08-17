import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';

import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config()
// import 'dotenv/config'

// dotenv.config()

import Home from './Home/Home';
import CrudVenta from './ventas/crudVenta';
import  Traslados  from "./Traslados/Traslados";


// const URI_AUTH = 'tu_uri_auth'; // Define URI_AUTH correctamente
const URI_AUTH = process.env.SERVER_BACK + '/Auth'; // Define URI_AUTH correctamente

console.log(URI_AUTH)

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('userMercasoft'));
  //   if (!user) {
  //     setIsAuth(false);
  //   } else {
  //     axios.get(`${URI_AUTH}/verify`, {
  //       headers: { Authorization: `Bearer ${user.tokenUser}` }
  //     }).then(response => {
  //       if (response.status === 200) {
  //         setIsAuth(true);
  //       }
  //     }).catch(() => {
  //       setIsAuth(false);
  //     });
  //   }
  // }, []);

  // const logOutUser = () => {
  //   localStorage.removeItem('userMercasoft');
  //   setIsAuth(false);
  //   navigate('/auth');
  // };

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/Traslados">Traslados</Link>
          </li>
          <li>
            <Link to="/Ventas">Ventas</Link>
          </li>
          {/* {!isAuth && (
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
          )} */}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Traslados" element={<Traslados />} />
        <Route path="/Ventas" element={<CrudVenta />} />
        {/* {isAuth ? (
          <>
            <Route path="/Ventas" element={<CrudVenta />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
        {!isAuth && <Route path="/auth" element={<Auth />} />} */}
      </Routes>
    </>
  );
}

export default App;

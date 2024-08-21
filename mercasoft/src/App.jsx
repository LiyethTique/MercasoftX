import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import crudEntrada from './entrada/crudEntrada';
import crudPedido from './pedido/crudPedido';

// Usa import.meta.env para acceder a la variable de entorno
const URI_USUARIO = import.meta.env.VITE_SERVER_BACK || 'https://localhost:3001';

console.log(URI_USUARIO);

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav>
        <ul>
          <li>
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
      </Routes>
    </>
  );
}

export default App;

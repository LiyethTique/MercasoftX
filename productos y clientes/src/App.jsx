import { useState } from 'react'

import { Routes, Route, Link } from 'react-router-dom'
import Home from'./home/Home'
import CrudProductos from './productos/crudProductos'
import CrudClientes from './clientes/crudClientes'


function App() {
  return (
    <>
     <nav>{}
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/productos">Producto</Link>
        </li>
        <li>
          <Link to="/clientes">Cliente</Link>
        </li>
      </ul>
     </nav>
     {}
     <Routes>
      {}
      <Route path='/' element={<Home/>} />
      <Route path='/productos' element={<CrudProductos/>} />
      <Route path='/clientes' element={<CrudClientes/>} />
     </Routes>
    </>
  )
}

export default App

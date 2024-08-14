import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import dotenv from 'dotenv'

import crudEntrada from './entrada/crudEntrada'
import crudPedido from './pedido/crudPedido'

URI_AUTH = process.env.SERVER_PACK('/Auth.js')
function App() {

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="../src/entrada/crudentrada.jsx">Entrada</Link>
          </li>
          <li>
            <Link to="../src/pedido/crudPedido.jsx">Pedido</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='../src/entrada/crudentrada.jsx' element={<crudEntrada/>} />
      </Routes>
      <Routes>
        <Route path='../src/pedido/crudPedido.jsx' element={<crudPedido/>} />
      </Routes>
    </>
  )
}

export default App

import { useState } from 'react'

import { Routes, Route, Link } from 'react-router-dom'

import crudEntradas from './entradas/crudentradas'

function App() {

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="../src/entradas/crudentradas.jsx">Entradas</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='../src/entradas/crudentradas.jsx' element={<crudEntradas/>} />
      </Routes>
    </>
  )
}

export default App

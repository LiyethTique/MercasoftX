import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './home/Home'
import CrudMercasoft from './Mercasoft/CrudMercasoft'
import CrudCenters from './centers/CrudCenters' 


function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/Mercasoft">Mercasoft</Link> 
          </li>
          <li>
            <Link to="/centers">Centers</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Mercasoft' element={<CrudMercasoft />} />
        <Route path='/centers' element={<CrudCenters/>} />
      </Routes>
    </>
  )
}

export default App

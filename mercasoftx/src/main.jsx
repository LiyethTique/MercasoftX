import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import CrudMercasoft from './mercasoft/crudmercasoft.jsx'

import { BrowserRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* <CrudMercasoft/> */}
  </React.StrictMode>,
  
)

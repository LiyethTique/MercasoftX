import { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Auth from './Auth/auth'

import Home from './Home/Home'
import CrudVenta from './ventas/crudVenta'
// import CrudCenters from './centers/crudCenters'


function App() {
  const [isAuth, setIsAuth] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userMercasoft'))
    if (!user) {
      setIsAuth(false)
    } else {
      axios.get(URI_AUTH + 'verify', {
        headers: {Authorization: `Bearer ${user.tokenUser}`}
      }).then(response => {
        if(response.status === 200) {
          setIsAuth(true)
        }
      }).cacth(() => {
        setIsAuth(false)
      })
    }
  }, [])

  const logOutUser = () => {

    localStorage.removeItem('userMercasoft')

    setIsAuth(false)

    navigate("/auth")
  }
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/ventas">Ventas</Link>
          </li>
          {
            !isAuth
            ?
            <li>
              <link to="/auth">Sesión</link>  
            </li> : ''
          }
          <li>
            <link to="/auth">Sesión</link>
          </li>
          {isAuth ?
          <li>
            <button onClick={() => logOutUser()} className='btn btn-secundary'><i className='fa-solid fa-door-closed'>Cerrar Sesión</i></button>
          </li> : ''
          }
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<Home />}/>

        {isAuth ?
        <> 
        <Route path='/ventas' element={<CrudVenta />}/>
        </>
        :
        <Route path='*' element={<Navigate to="/"/>}/>
        }
        {
          !isAuth
            ?
        <Route path='/auth'element={<Auth />} />
        : 
        ''
}
        
      </Routes>
    </>
  )
}

export default App

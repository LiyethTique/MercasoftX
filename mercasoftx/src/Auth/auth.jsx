import axios from "axios"
import {useState} from "react"
import { loginUser } from "../../../node/controllers/AuthController"

const URI_AUTH = 'http://localhost:8000/auth/'

const Auth = () => {
    const [name, SetName] = useState('')
    const [email, SetEmail] = useState('')
    const [password, setPassword] = useState('')

    const [buttonForm, SetButtonForm] = useState('Registrar')

    const [signInOrLogin,setSignInOrLogIn] = useState('signIn')

    const [ResetPass, SetResetPass] = useState(false)

    const SendForm = async (e) => {
        e.preventDefault()

        if (buttonForm == 'Registrar'){
            
            console.log('Registrando ando...')

            await axios.post(URI_AUTH, {
                name: name,
                email: email,
                password: password
            }).then(response =>{
                if (response.data.tokenUser){
                    localStorage.setItem('userMercasoft', JSON.stringify(response.data))
                }
            })
        }else if(buttonForm == 'iniciar Sesión') {
            console.log('Iniciando ando...')

            await axios.post(URI_AUTH + 'login', {
                email: email,
                password: password
            }).then(response => {
                if (response.data.tokenUser) {
                    localStorage.setItem('userMercasoft', JSON.stringify(response.data))
                    let miHost = window.location.host
                    console.log(miHost)
                    window.location.href = miHost.toString
                }
            })
            }
        }
        
        const SwitchForm = (opcion) => {

            setSignInOrLogIn(opcion)
        }

    

    return (
        <>
        {
            resetPass == false ?
            signInOrLogin == 'signIn'
            ?
            <button className="btn btn-primary" onClick={() => { SwitchForm('logIn'); SetButtonForm('Iniciar Sesión')}}>Iniciar sesion</button>
            :
            <span className="btn btn-primary" onClick={() => {SwitchForm('signIn'); SetButtonForm('Registrar')}}>Registrarse</span>
            :''
        }
        <>
        <form onSubmit={SendForm}>
            {
                signInOrLogin == 'signIn'
                ?
                <>
                    <label htmlFor="name">Nombre completo: </label>
                    <input type="text" id="name" value={name} onChange={(e) => SetName(e.target.value)} />
                </>
                :''
            }
            
            <br />
            <label htmlFor="email">Correo Electronico: </label>
            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <br />
            <label htmlFor="password">Contraseña: </label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br />
            <input type="submit" value={buttonForm} />


            

        </form>
        <link onClick={() => { SetResetPass(!ResetPass)}}>Restablecer Contraseña</link>
        </>
        :
        <>
        <form>
            <label htmlFor="email"> Correo electronico: </label>
            <input type="email" id="email" value={email} onChange={(e) => SetEmail(e.target.value)}/>
            <br />
            <input type="submit" value="Enviar"/>
        </form>
        <link onClick={() => {SetResetPass(!ResetPass)}}>Volver</link>
        </>
      
</>
    )
}


export default Auth
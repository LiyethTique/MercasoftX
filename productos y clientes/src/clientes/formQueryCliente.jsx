import axios from "axios";
import { useEffect, useState } from "react";

const FormQueryCliente = ({ URI, getCliente, deleteCliente, buttonForm }) => {

    const[clienteQuery, setClienteQuery] = useState([])
    const[Nom_Cliente, setNom_Cliente] = useState('')

    const sendFormQuery = async (Nom_Cliente) => {

        console.log(Nom_Cliente)

        if (Nom_Cliente) {
            const respuesta = await axios.get(URI + 'Nom_Cliente/' + Nom_Cliente)
            setClienteQuery(respuesta.data)

        }else {
            setClienteQuery([])
        }
    }

    useEffect(() => {
        setClienteQuery([])
        setNom_Cliente('')
    }, [buttonForm])

    return (
        <>
            <form action="" id="queryForm">
                <label htmlFor="Nom_ClienteQuery">Nombre</label>
                <input type="text" id="Nom_ClienteQuery" value={Nom_Cliente} onChange={(e) => { sendFormQuery(e.target.value);
					 setNom_Cliente(e.target.value) }} />
            </form>
                 
             { 
			 clienteQuery.length > 0 ?<table>
                    <thead>
                        <tr>
                       
                        <th>Nom_Cliente</th>
                        <th>Cor_Cliente</th>
                        <th>Tel_Cliente</th>
                        <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        { }
                        {clienteQuery.map((cliente) => (
                             <tr key={cliente.id}>
                                
                                 <td>{cliente.Nom_Cliente}</td>
                                 <td>{cliente.Cor_Cliente}</td>
                                 <td>{cliente.Tel_Cliente}</td>
                                
                                 <td>
                                    <button onClick={() => getCliente(cliente.id)}>Editar</button>
                                    <button onClick={() => deleteCliente(cliente.id)}>Borrar</button></td>
                             </tr>
                        ))}
                    </tbody>
                </table> : ''
             }
        </>
    )
}

export default FormQueryCliente
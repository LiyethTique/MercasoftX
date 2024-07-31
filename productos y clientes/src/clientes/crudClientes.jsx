import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FormClientes from './formClientes'
import Swal from 'sweetalert2'
import FormQueryCliente from './formQueryCliente'

const URI = 'http://localhost:8000/clients/'


const CrudClientes = () => {
	const [clienteList, setClienteList] = useState([])
	const [buttonForm, setButtonForm] = useState('Enviar')
	const [cliente, setCliente] = useState({
		id: '',
		Nom_Cliente: '',
		Cor_Cliente: '',
		Tel_Cliente: ''
	})
	
	//const [clientes, setClientes]= useState([])
	
	useEffect(() => {
		getAllClientes()
	}, [clienteList])

	const getAllClientes = async () => {
		const respuesta = await axios.get(URI)
		setClienteList(respuesta.data)
	}

	const getCliente= async(idCliente) => {
        
        setButtonForm('Enviar')
        const respuesta = await axios.get(URI + idCliente)

        setButtonForm('Actualizar')

        setCliente({
            ...respuesta.data 
        })
	 }


    const updateTextButton = (texto) => {
        setButtonForm(texto)
    }
    
    const deleteCliente =(idCliente) =>{
        Swal.fire({
            title: "Estás Seguro?",
            text: "No Podrás Revertir Esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Borrar!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                await axios.delete(URI + idCliente)
              Swal.fire({
                title: "Borrado!",
                text: "El Registro Ha Sido Borrado.",
                icon: "success"
              });
            }
          });
    }


	return(
		<>
		    <table>
				<thead>
					<tr>
						<th>Nom_Cliente</th>
						<th>Cor_Cliente</th>
						<th>Tel_Cliente</th>
						<th>Acciones</th>
					</tr>
				</thead>
			<tbody>
				{clienteList.map((cliente) =>(
					<tr key={cliente.id}>
						<td>{cliente.Nom_Cliente}</td>
						<td>{cliente.Cor_Cliente}</td>
						<td>{cliente.Tel_Cliente}</td>
						<td>
							<button onClick={() =>getCliente(cliente.id)}>Editar</button>
							<button onClick={() =>deleteCliente(cliente.id)}>Borrar</button></td>
					</tr>

				))}
			</tbody>
		   </table>
		<hr/>
		<FormClientes buttonForm={buttonForm} cliente={cliente} URI={URI} updateTextButton={updateTextButton}/>
		<hr/>
		<FormQueryCliente URI={URI} getCliente={getCliente} deleteCliente={deleteCliente} buttonForm={buttonForm}/>
		
		 </>
	)
}

export default CrudClientes






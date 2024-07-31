import axios from "axios";
import { useState, useEffect } from "react";



const FormClientes = ({buttonForm, cliente, URI, updateTextButton}) => {
	 
	 const [Nom_Cliente, setNom_Cliente] = useState('')
	 const [Cor_Cliente, setCor_Cliente] = useState('')
	 const [Tel_Cliente, setTel_Cliente] = useState('')
	 


	 const sendForm = (e) => {

		e.preventDefault()	

		if (buttonForm == 'Actualizar') {
			console.log('actualizando ando....') 


             axios.put(URI + cliente.id, {
				
				Nom_Cliente: Nom_Cliente,
				Cor_Cliente: Cor_Cliente,
				Tel_Cliente: Tel_Cliente
				
			 })

			 updateTextButton('Enviar') 
			 clearForm()


		} else if (buttonForm == 'Enviar') {
			console.log('guardando ando...')
			
			axios.post(URI, {

				Nom_Cliente: Nom_Cliente,
				Cor_Cliente: Cor_Cliente,
				Tel_Cliente: Tel_Cliente
				
				
			})
			clearForm()
			
		}	
	}

	const clearForm =()=>{
		
		setNom_Cliente('')
		setCor_Cliente('')
		setTel_Cliente('')
		
	}


	const setData = () => {
		
		setNom_Cliente(cliente.Nom_Cliente)
		setCor_Cliente(cliente.Cor_Cliente)
		setTel_Cliente(cliente.Tel_Cliente)
		
	}
	useEffect(() => {
		setData()
	}, [cliente])
		
	return (
		<>
			
		 <form id="clienteForm" action="" onSubmit={sendForm}>
			
			<label htmlFor="Nom_Cliente">Nom_Cliente</label>
			<input type="text" id="Nom_Cliente" value={Nom_Cliente} onChange={(e) => setNom_Cliente (e.target.value)}/>
			<br/>
			<label htmlFor="Cor_Cliente">Cor_Cliente</label>
			<input type="text" id="Cor_Cliente" value={Cor_Cliente} onChange={(e) => setCor_Cliente (e.target.value)}/>
			<br/>
			<label htmlFor="Tel_Cliente">Tel_Cliente</label>
			<input type="number" id="Tel_Cliente" value={Tel_Cliente} onChange={(e) => setTel_Cliente (e.target.value)}/>
			<br/>
			
			<br />
		
			
			<input type="submit" id="boton"  value={buttonForm}  className="btn btn-success" />
			
			</form>
	     </>

)
}

export default FormClientes
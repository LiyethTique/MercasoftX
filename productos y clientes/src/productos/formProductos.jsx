import axios from "axios";
import { useRef, useState } from "react";
import { useEffect } from "react";

//agregue la const foto
const FormProductos = ({buttonForm, producto, URI, updateTextButton}) => {
	 
	 const [Nom_Producto, setNom_Producto] = useState('')
	 const [Car_Producto, setCar_Producto] = useState('')
	 const [Pre_Promedio, setPre_Promedio] = useState('')
	 const [Exi_Producto, setExi_Producto] = useState('')
	 const [Ima_Producto, setIma_Producto] = useState(null)
	 const [Fec_Vencimiento, setFec_Vencimiento] = useState('')
	 const [Pre_Anterior, setPre_Anterior] = useState('')
	 const [Uni_DeMedida, setUni_DeMedida] = useState('')
	 const [Pre_Producto, setPre_Producto] = useState('')

	 const inputIma_Producto =useRef(null)

	 const sendForm = (e) => {

		e.preventDefault()	

		if (buttonForm == 'Actualizar') {
			console.log('actualizando ando....') 
//agregue campo foto

             axios.put(URI + producto.id, {
				
				Nom_Producto: Nom_Producto,
				Car_Producto: Car_Producto,
				Pre_Promedio: Pre_Promedio,
				Exi_Producto: Exi_Producto,
				Ima_Producto: Ima_Producto,
				Fec_Vencimiento: Fec_Vencimiento,
				Pre_Anterior: Pre_Anterior,
				Uni_DeMedida: Uni_DeMedida,
				Pre_Producto: Pre_Producto

			 }, {
//esto es nuevo
				headers: { "Content-Type": "multipart/form-data" }
			 })

			 updateTextButton('Enviar') 

			 clearForm()


		} else if (buttonForm == 'Enviar') {
			console.log('guardando ando...'+ Ima_Producto)
			
			axios.post(URI, {
				
				Nom_Producto: Nom_Producto,
				Car_Producto: Car_Producto,
				Pre_Promedio: Pre_Promedio,
				Exi_Producto: Exi_Producto,
				Ima_Producto: Ima_Producto,
				Fec_Vencimiento: Fec_Vencimiento,
				Pre_Anterior: Pre_Anterior,
				Uni_DeMedida: Uni_DeMedida,
				Pre_Producto: Pre_Producto
				
				
				
			 }, {
//esto es nuevo
				headers: { "Content-Type": "multipart/form-data" }

		
			 })

			clearForm()
			
		}	
	}

	const clearForm =()=>{
		
		setNom_Producto('')
		setCar_Producto('')
		setPre_Promedio('')
		setExi_Producto('')
		setIma_Producto(null)
		setFec_Vencimiento('')
		setPre_Anterior('')
		setUni_DeMedida('')
		setPre_Producto('')
		inputIma_Producto.current.value = ''
		
		
	}


	const setData = () => {
		
		setNom_Producto(producto.Nom_Producto)
		setCar_Producto(producto.Car_Producto)
		setPre_Promedio(producto.Pre_Promedio)
		setExi_Producto(producto.Exi_Producto)
		setIma_Producto(producto.Ima_Producto)
		setFec_Vencimiento(producto.Fec_Vencimiento)
		setPre_Anterior(producto.Pre_Anterior)
		setUni_DeMedida(producto.Uni_DeMedida)
		setPre_Producto(producto.Pre_Producto)
		
	}
	useEffect(() => {
		setData()
	}, [producto])
		
	return (
		<>
			
			<form id="productoForm" action="" onSubmit={sendForm}>
			
			<label htmlFor="Nom_Producto">Nom_Producto</label>
			<input type="text" id="Nom_Producto" value={Nom_Producto} onChange={(e) => setNom_Producto (e.target.value)}/>
			<br/>
			<label htmlFor="Car_Producto">Car_Producto</label>
			<input type="text" id="Car_Producto" value={Car_Producto} onChange={(e) => setCar_Producto (e.target.value)}/>
			<br/>
			<label htmlFor="Pre_Promedio">Pre_Promedio</label>
			<input type="number" id="Pre_Promedio" value={Pre_Promedio} onChange={(e) => setPre_Promedio (e.target.value)}/>
			<br/>
			<label htmlFor="Exi_Producto">Exi_Producto</label>
			<select name="" id="Exi_Producto" value={Exi_Producto} onChange={(e) => setExi_Producto(e.target.value)}>
			      <option value="">Selecciona uno...</option>
				  <option value="S">Si</option>
				  <option value="N">No</option>
			</select>
			<br/>
			<label htmlFor="Ima_Producto"></label>
			<input type="file" id="Ima_Producto"  onChange={(e) => setIma_Producto(e.target.files[0])} ref={inputIma_Producto}></input>
			<br/>
			<label htmlFor="Fec_Vencimiento">Fec_Vencimiento</label>
			<input type="date" id="Fec_Vencimiento" value={Fec_Vencimiento} onChange={(e) => setFec_Vencimiento (e.target.value)}/>
			<br/>
			<label htmlFor="Pre_Anterior">Pre_Anterior</label>
			<input type="number" id="Pre_Anterior" value={Pre_Anterior} onChange={(e) => setPre_Anterior (e.target.value)}/>
			<br/>
			<label htmlFor="Uni_DeMedida">Uni_DeMedida</label>
			<select name="" id="Uni_DeMedida" value={Uni_DeMedida} onChange={(e) => setUni_DeMedida(e.target.value)}>
			      <option value="">Selecciona uno...</option>
				  <option value="Lb">Libra</option>
				  <option value="G">Gramo</option>
				  <option value="Kl">Kilogramo</option>
			</select>
			<br />
			<label htmlFor="Pre_Producto">Pre_Producto</label>
			<input type="number" id="Pre_Producto" value={Pre_Producto} onChange={(e) => setPre_Producto (e.target.value)}/>
			<br/>
	
			<input type="submit" id="boton"  value={buttonForm}  className="btn btn-success" />
			
			</form>
	     </>

)
}

export default FormProductos


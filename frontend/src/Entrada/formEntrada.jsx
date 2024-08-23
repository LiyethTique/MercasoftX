import { useState } from "react";
import { useEffect } from "react";

const FormEntrada = ({ buttonForm, entrada, updateTextButton }) => {

    const [Fec_Entrada, setFec_Entrada] = useState('')
    const [Hor_Entrada, setHor_Entrada] = useState('')
    const [Id_Unidad, setId_Unidad] = useState('')
    const [Id_Producto, setId_Producto] = useState('')
    const [Id_Responsable, setId_Responsable] = useState('')
    const [Can_Entrada, setCan_Entrada] = useState('')
    const [Fec_Vencimiento, setFec_Vencimiento] = useState('')

    const sendForm = (e) => {

        e.preventDafult()

        if (buttonForm == 'Actualizar') {
            console.log('actualizando ando...')

            const respuesta = axios.put(URI + entrada.Id_Entrada, {
                Fec_Entrada: Fec_Entrada,
                Hor_Entrada: Hor_Entrada,
                Id_Unidad: Id_Unidad,
                Id_Producto: Id_Producto,
                Id_Responsable: Id_Responsable,
                Can_Entrada: Can_Entrada,
                Fec_Vencimiento: Fec_Vencimiento
            })
            if (respuesta.status == 201){
                updateTextButton('Enviar')
                clearForm()  
            }
        } else if (buttonForm == 'Enviar') { 
            console.log('guardando ando...') 

            const respuesta = axios.post(URI, {
                Fec_Entrada: Fec_Entrada,
                Hor_Entrada: Hor_Entrada,
                Id_Unidad: Id_Unidad,
                Id_Producto: Id_Producto,
                Id_Responsable: Id_Responsable,
                Can_Entrada: Can_Entrada,
                Fec_Vencimiento: Fec_Vencimiento
            })
            if (respuesta.status == 201){
            clearForm()  
            }
        }

        const clearForm = () => {
            setFec_Entrada('')
            setHor_Entrada('')
            setId_Unidad('')
            setId_Producto('')
            setId_Responsable('')
            setCan_Entrada('')
            setFec_Vencimiento('')
        }

        const setData = () => {
            setFec_Entrada(entrada.Fec_Entrada)
            setHor_Entrada(entrada.Hor_Entrada)
            setId_Unidad(entrada.Id_Unidad)
            setId_Producto(entrada.Id_Producto)
            setId_Responsable(entrada.Id_Responsable)
            setCan_Entrada(entrada.Can_Entrada)
            setFec_Vencimiento(entrada.Fec_Vencimiento)
        }

        useEffect(() => {
            setData()
        }), [entrada]
    }
    return (
        <>
            <form id="entradaForm" action="" onSubmit={sendForm}>
                <label htmlFor="Fec_Entrada">Fecha de la entrada</label>
                <input type="text" id="Fec_Entrada" value={Fec_Entrada} onChange={(e) => setFec_Entrada(e.target.value)} />
                <br />
                <label htmlFor="Hor_Entrada">Hora de la entrada</label>
                <input type="text" id="Hor_Entrada" value={Hor_Entrada} onChange={(e) => setHor_Entrada(e.target.value)} />
                <br />
                <label htmlFor="Id_Unidad">Nombre de la unidad</label>
                <input type="text" id="Id_Unidad" value={Id_Unidad} onChange={(e) => setId_Unidad(e.target.value)} />
                <br />
                <label htmlFor="Id_Producto">Nombre del producto</label>
                <input type="text" id="Id_Producto" value={Id_Producto} onChange={(e) => setId_Producto(e.target.value)}/>
                <br />
                <label htmlFor="Id_Responsable">Responsable del producto</label>
                <input type="text" id="Id_Responsable" value={Id_Responsable} onChange={(e) => setId_Responsable(e.target.value)} />
                <br />
                <label htmlFor="Can_Entrada">Cantidad que entra del producto</label>
                <input type="text" id="Can_Entrada" value={Can_Entrada} onChange={(e) => setCan_Entrada(e.target.value)}/>
                <br />
                <label htmlFor="Fec_Vencimiento">Fecha de vencimiento</label>
                <input type="text" id="Fec_Vencimiento" value={Fec_Vencimiento} onChange={(e) => setFec_Vencimiento(e.target.value)}/>

                <input type="text" id="boton" value={buttonForm} className="btn btn-success" />
            </form>
        </>
    )
}

export default FormEntrada
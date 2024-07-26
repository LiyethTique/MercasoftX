import axios from 'axios'
import { useState, useEffect } from 'react'
import FormVenta from './FormVenta'
import FormQueryVenta from './formQueryVenta'

import Swal from 'sweetalert2'

const URI = 'http://localhost:8000/venta/'

const CrudVenta = () => {
    
        const [ventaList, setVentaList] = useState([])

        const [buttonForm, setButtonForm] = useState('Enviar')

        const [venta, setVenta] = useState({
            id: '',
            Fec_Venta: '',
            Can_Venta: '',
            Val_Venta: ''
        })

        useEffect(() =>{
            getAllVenta()
        }, [ventaList])

        const getAllVenta = async () => {
            const respuesta = await axios.get(URI)

            setVentaList(respuesta.data)

            
        }

        const getVenta = async (idVenta) => {

            setButtonForm('Actualizar')
            console.log('idVenta' + idVenta)
            const respuesta = await axios.get(URI + idVenta)
            

            console.log(respuesta.data)

            setVenta({
                ...respuesta.data
            })
        }
        const updateTextButton = (texto) => {
            setButtonForm(texto)
        }

        const deleteVenta =(idVenta) => {
            Swal.fire({
                title: "Estas seguro?",
                text: "No podras revertir esto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, borrar!"
              }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.delete(URI + idVenta)
                  Swal.fire({
                    title: "Borrado!",
                    text: "El registro ha sido borrado.",
                    icon: "success"
                  });
                }
              });
        }
    return(
        <>
        
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Fecha Venta</th>
                    <th>Cantidad Venta</th>
                    <th>Valor Venta</th>
                </tr>
            </thead>
            <tbody>
                {}
                {ventaList.map((venta) => (
                    <tr key={venta.id}>
                        <td>{venta.id}</td>
                        <td>{venta.Fec_Venta}</td>
                        <td>{venta.Can_Venta}</td>
                        <td>{venta.Val_Venta}</td>
                        <td>
                            <button class="btn btn-warning" onClick={() => getVenta(venta.id)}>Editar</button>
                            <button class="btn btn-warning" onClick={() => deleteVenta(venta.id)}>Borrar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <hr/>
        <FormVenta buttonForm={buttonForm} venta={venta} URI={URI} updateTextButton={updateTextButton} />
        <hr />
        <FormQueryVenta URI={URI} getVenta={getVenta} deleteVenta={deleteVenta} buttonForm={buttonForm} />
        
        </>
    )
    
}

export default CrudVenta
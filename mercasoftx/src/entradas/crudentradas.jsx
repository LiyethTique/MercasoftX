import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Swal from 'sweetalert2'

const URI = 'http://localhost:3306/entradas'

const crudEntradas = () => {

    const [entradaList, setEntradasList] = useState([])

    const [buttonForm, setButtonForm] = useState('Enviar')

    const [entrada, setEntrada] = useState({
        Id_Entrada: '',
        Fec_Entrada: '',
        Hor_Entrada: '',
        Id_Unidad: '',
        Id_Producto: '',
        Id_Responsable: '',
        Can_Entrada: '',
        Fec_Vencimiento: ''
    })

    useEffect(() => {
        getAllEntradas()
    }, [entradaList]);

    const getAllEntradas = async () => {
        const respuesta = await axios.get(URI)
        console.log(respuesta)
        if (respuesta.status == 200) {
            setEntradasList(respuesta.data)
        }
    }

    const getEntrada = async (Id_Entrada) => {
        setButtonForm('Enviar')
        const respuesta = await axios.get(URI + Id_Entrada)
        console.log(respuesta)
        if (respuesta.status == 201) {
            setButtonForm('Actualizar')
            setEntrada({
                ...respuesta.data
            })
        }
    }

    const updateTextButton = (texto) => {
        setButtonForm(texto)
    }

    const deleteEntrada = (Id_Entrada) => {
        Swal.fire({
            title: "Estás seguro?",
            text: "No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borrar!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                await axios.delete(URI + Id_Entrada)
              Swal.fire({
                title: "Borrado!",
                text: "El registro ha sido borrado.",
                icon: "success"
              });
            }
          });
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Fecha de la entrada</th>
                        <th>Hora de la entrada</th>
                        <th>Nombre de la unidad</th>
                        <th>Nombre del producto</th>
                        <th>Nombre de la persona encargada de hacer la entrega</th>
                        <th>Cantidad de productos</th>
                        <th>Fecha de vencimiento</th>
                    </tr>
                </thead>
                <tbody>
                    {entradaList.map((entrada) => {
                        <tr key={entrada.id}>
                            <td>{entrada.Fec_Entrada}</td>
                            <td>{entrada.Hor_Entrada}</td>
                            <td>{entrada.Id_Unidad}</td>
                            <td>{entrada.Id_Producto}</td>
                            <td>{entrada.Id_Responsable}</td>
                            <td>{entrada.Can_Entrada}</td>
                            <td>{entrada.Fec_Vencimiento}</td>
                            <td>
                                <button onClick={() => getEntrada(entrada.Id_Entrada)}>Editar</button>
                                <button onClick={() => deleteEntrada(entrada.Id_Entrada)}>Borrar</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            <hr />
            <FormEntrada buttonForm={buttonForm} entrada={entrada} URI={URI} updateTextButton={updateTextButton} />
            <FormQueryEntrada URI={URI} getEntrada={getEntrada} deleteEntrada={deleteEntrada} buttonForm={buttonForm} />
        </>
    )
}

export default crudEntradas
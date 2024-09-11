import axios from 'axios'
import { useState, useEffect } from 'react'
import FormTraslado from './formTraslado'
import FormQueryTraslado from './formQueryTraslado'
import Sidebar from '../Sidebar/Sidebar'

import Swal from 'sweetalert2'

const URI = process.env.SERVER_BACK + '/traslado/'

const CrudTraslado = () => {

    useEffect(() => {
        const fetchTraslados = async () => {

            await axios.get(URI).then((resp) => {
                if (resp.status == 200) {
                    setTrasladoList(resp.data);
                    console.log(resp.data)
                }
            }).catch((err) => {
                alert(err.response.data.message)
            })


        };

        fetchTraslados();
    }, []);
    const [trasladoList, setTrasladoList] = useState([]);

    const [buttonForm, setButtonForm] = useState('Enviar')

    const [traslado, setTraslado] = useState({
        Id_Traslado: '',
        Fec_Traslado: '',
        Des_Traslado: '',
        Id_Producto: '',
        Can_Producto: '',
        Val_Unitario: '',
        Val_Traslado: '',
        Id_Responsable: ''
    })

    useEffect(() => {
        getAllTraslado()
    }, [])

    const getAllTraslado = async () => {
        try {
            const respuesta = await axios.get(URI)
            setTrasladoList(respuesta.data)
        } catch (error) {
            alert(error.response.data.message)
        }

    }

    const getTraslado = async (Id_Traslado) => {

        setButtonForm('Actualizar')
        console.log('Id_Traslado' + Id_Traslado)
        const respuesta = await axios.get(URI + Id_Traslado)


        console.log(respuesta.data)

        setTraslado({
            ...respuesta.data
        })
    }
    const updateTextButton = (texto) => {
        setButtonForm(texto)
    }

    const deleteTraslado = (Id_Traslado) => {
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
                await axios.delete(URI + Id_Traslado)
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
            <Sidebar />
            <div>
                <h2>Lista de Traslados</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID Traslado</th>
                            <th>Fecha Traslado</th>
                            <th>Descripción Traslado</th>
                            <th>ID Producto</th>
                            <th>Cantidad Producto</th>
                            <th>Valor Unitario</th>
                            <th>Valor Traslado</th>
                            <th>ID Responsable</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trasladoList.map(traslado => (
                            <tr key={traslado.Id_Traslado}>
                                <td>{traslado.Id_Traslado}</td>
                                <td>{new Date(traslado.Traslado).toLocaleDateString()}</td>
                                <td>{traslado.Des_Traslado}</td>
                                <td>{traslado.Id_Producto}</td>
                                <td>{traslado.Can_Producto}</td>
                                <td>{traslado.Val_Unitario}</td>
                                <td>{traslado.Val_Traslado}</td>
                                <td>{traslado.Id_Responsable}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => getTraslado(traslado.Id_Traslado)}>Editar</button>
                                    <button className="btn btn-warning" onClick={() => deleteTraslado(traslado.Id_Traslado)}>Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr />
                <FormTraslado buttonForm={buttonForm} traslado={traslado} URI={URI} updateTextButton={updateTextButton} />
                <hr />
                <FormQueryTraslado URI={URI} getTraslado={getTraslado} deleteTraslado={deleteTraslado} buttonForm={buttonForm} />
            </div >
        </>
    )
}

export default CrudTraslado
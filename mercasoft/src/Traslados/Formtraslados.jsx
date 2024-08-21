import axios from 'axios';
import { useState, useEffect } from 'react';
import TrasladosForm from './TrasladosForm';

const URI = process.env.SERVER_BACK + '/traslado'

const CrudTraslados = () => {
    const [trasladosList, setTrasladosList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [traslado, setTraslado] = useState({
        trimestre_traslado: '',
        fecha: '',
        descripcion_elemento: '',
        unidad_medida: '',
        cantidad: '',
        vlr_unitario: '',
        vlr_total: '',
        referencia: '',
        fecha_vencimiento: '',
        centro_costo: '',
        sub_centro_costo: '',
        actividad_formacion: '',
        nombre_traslada: '',
        nombre_recibe: ''
    });

    useEffect(() => {
        getAllTraslados();
    }, []);

    const getAllTraslados = async () => {
        try {
            const respuesta = await axios.get(URI);
            // Verificar que la respuesta es un array
            if (Array.isArray(respuesta.data)) {
                setTrasladosList(respuesta.data);
            } else {
                console.error('La respuesta de la API no es un array:', respuesta.data);
                setTrasladosList([]); // Inicializa como un array vacío en caso de error
            }
        } catch (error) {
            console.error(Error `${error.response.status} :${error.response.statusText}`);
            setTrasladosList([]); // Inicializa como un array vacío en caso de error
        }
    };

    const getTraslado = async (idTraslado) => {
        try {
            setButtonForm('Actualizar');
            const respuesta = await axios.get(`${URI}${idTraslado}`);
            setTraslado({
                ...respuesta.data
            });
        } catch (error) {
            console.error(Error `${error.response.status} : ${error.response.statusText}`);
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteTraslado = async (idTraslado) => {
        try {
            await axios.delete(${URI}${idTraslado});
            getAllTraslados();
        } catch (error) {
            console.error(Error ${error.response.status}: ${error.response.statusText});
        }
    };

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Trimestre de Traslado</th>
                        <th>Descripción del Elemento</th>
                        <th>Unidad de Medida</th>
                        <th>Cantidad</th>
                        <th>Valor Unitario</th>
                        <th>Valor Total</th>
                        <th>Referencia</th>
                        <th>Fecha de Vencimiento</th>
                        <th>Centro de Costo</th>
                        <th>Sub Centro de Costo</th>
                        <th>Actividad de Formación</th>
                        <th>Nombre de Quien Traslada</th>
                        <th>Nombre de Quien Recibe</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {trasladosList.length > 0 ? (
                        trasladosList.map((traslado) => (
                            <tr key={traslado.id}>
                                <td>{traslado.fecha}</td>
                                <td>{traslado.trimestre_traslado}</td>
                                <td>{traslado.descripcion_elemento}</td>
                                <td>{traslado.unidad_medida}</td>
                                <td>{traslado.cantidad}</td>
                                <td>{traslado.vlr_unitario}</td>
                                <td>{traslado.vlr_total}</td>
                                <td>{traslado.referencia}</td>
                                <td>{traslado.fecha_vencimiento}</td>
                                <td>{traslado.centro_costo}</td>
                                <td>{traslado.sub_centro_costo}</td>
                                <td>{traslado.actividad_formacion}</td>
                                <td>{traslado.nombre_traslada}</td>
                                <td>{traslado.nombre_recibe}</td>
                                <td>
                                    <button onClick={() => getTraslado(traslado.id)}>Editar</button>
                                    <button onClick={() => deleteTraslado(traslado.id)}>Borrar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="14">No hay datos disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <hr />
            <TrasladosForm
                buttonForm={buttonForm}
                traslado={traslado}
                URI={URI}
                updateTextButton={updateTextButton}
            />
        </>
    );
};

export default CrudTraslados;
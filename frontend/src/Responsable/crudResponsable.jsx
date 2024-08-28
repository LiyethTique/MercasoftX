import axios from 'axios';
import { useState, useEffect } from 'react';
import FormResponsable from './formResponsable';
import FormQueryResponsable from './formQueryResponsable';
import Swal from 'sweetalert2';
import { Link } from'react-router-dom';
import Sidebar from '../Sidebar/Sidebar.jsx';

const URI = process.env.SERVER_BACK + '/responsable/';

const CrudResponsable = () => {
    const [responsableList, setResponsableList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [responsable, setResponsable] = useState({
        Id_Responsable: '',
        Nom_Responsable: '',
        Cor_Responsable: '',
        Tel_Responsable: '',
        Tip_Responsable: '',
        Tip_Genero: ''
    });

    useEffect(() => {
        getAllResponsables();
    }, []);

    const getAllResponsables = async () => {
        try {
            const respuesta = await axios.get(URI);
            setResponsableList(respuesta.data);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const getResponsable = async (idResponsable) => {
        setButtonForm('Actualizar');
        const respuesta = await axios.get(URI + idResponsable);
        setResponsable({
            ...respuesta.data
        });
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteResponsable = async (idResponsable) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, borrar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(URI + idResponsable);
                Swal.fire({
                    title: "¡Borrado!",
                    text: "El registro ha sido borrado.",
                    icon: "success"
                });
                getAllResponsables(); // Refresh the list after deletion
            }
        });
    };

    const handleFormSubmit = async () => {
        await getAllResponsables(); // Refresh list after form submission
    };

    return (
        <>
        <Sidebar/>            
        <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID Responsable</th>
                        <th>Nombre Completo</th>
                        <th>Correo Electronico</th>
                        <th>Teléfono</th>
                        <th>Tip Responsable</th>
                        <th>Género</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {responsableList.map((responsable) => (
                        <tr key={responsable.Id_Responsable}>
                            <td>{responsable.Id_Responsable}</td>
                            <td>{responsable.Nom_Responsable}</td>
                            <td>{responsable.Cor_Responsable}</td>
                            <td>{responsable.Tel_Responsable}</td>
                            <td>{responsable.Tip_Responsable}</td>
                            <td>{responsable.Tip_Genero}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => getResponsable(responsable.Id_Responsable)}>Editar</button>
                                <button className="btn btn-danger" onClick={() => deleteResponsable(responsable.Id_Responsable)}>Borrar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <FormResponsable 
                buttonForm={buttonForm} 
                responsable={responsable} 
                URI={URI} 
                updateTextButton={updateTextButton}
                onSubmit={handleFormSubmit} // Add this prop to handle form submission
            />
            <hr />
            <FormQueryResponsable 
                URI={URI} 
                getResponsable={getResponsable} 
                deleteResponsable={deleteResponsable} 
                buttonForm={buttonForm} 
                onSubmit={handleFormSubmit} // Add this prop to handle form submission
            />
        </>
    );
};

export default CrudResponsable;

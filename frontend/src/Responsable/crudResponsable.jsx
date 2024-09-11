import axios from 'axios';
import { useState, useEffect } from 'react';
import FormResponsable from '../Responsable/formResponsable';
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';
import WriteTable from '../Tabla/Data-Table';

const URI = (process.env.SERVER_BACK || 'http://localhost:3002') + '/responsable/';

const CrudResponsable = () => {
    const [responsableList, setResponsableList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [responsable, setResponsable] = useState({
        Id_Responsable: '',
        Nom_Responsable: '',
        Cor_Responsable: '',
        Tel_Responsable: '',
        Tip_Responsable: '',
        Tip_Genero: ''
    });

    useEffect(() => {
        getAllResponsable();
    }, []);

    const getAllResponsable = async () => {
        try {
            const respuesta = await axios.get(URI);
            setResponsableList(Array.isArray(respuesta.data) ? respuesta.data : []);
        } catch (error) {
            alert(error.response?.data?.message || "Error al obtener los Responsables");
        }
    };

    const getResponsable = async (Id_Responsable) => {
        setButtonForm('Actualizar');
        try {
            const respuesta = await axios.get(URI + Id_Responsable);
            setResponsable({
                ...respuesta.data
            });
            setIsFormVisible(true); // Mostrar formulario para editar
            document.getElementById('responsableModal').classList.add('show'); // Abrir modal manualmente
            document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
        } catch (error) {
            alert(error.response?.data?.message || "Error al obtener el Responsable");
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteResponsable = async (Id_Responsable) => {
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
                try {
                    await axios.delete(URI + Id_Responsable);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "El registro ha sido borrado.",
                        icon: "success"
                    });
                    getAllResponsable(); // Refrescar la lista después de eliminar
                } catch (error) {
                    alert(error.response?.data?.message || "Error al eliminar el Responsable");
                }
            }
        });
    };

    const handleShowForm = () => {
        setButtonForm('Enviar');
        setResponsable({
            Id_Responsable: '',
            Nom_Responsable: '',
            Cor_Responsable: '',
            Tel_Responsable: '',
            Tip_Responsable: '',
            Tip_Genero: ''
        });
        setIsFormVisible(true); // Mostrar formulario para agregar nuevo responsable
        document.getElementById('responsableModal').classList.add('show'); // Abrir modal manualmente
        document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
    };

    const closeModal = () => {
        setIsFormVisible(false); // Ocultar formulario
        document.getElementById('responsableModal').classList.remove('show'); // Cerrar modal manualmente
        document.body.style.overflow = ''; // Restablecer scroll de fondo
    };

    const titles = ['ID', 'Nombre', 'Correo', 'Teléfono', 'Tipo Responsable', 'Género', 'Acciones'];
    const data = responsableList.map(responsable => [
        responsable.Id_Responsable,
        responsable.Nom_Responsable,
        responsable.Cor_Responsable,
        responsable.Tel_Responsable,
        responsable.Tip_Responsable,
        responsable.Tip_Genero,
        <div key={responsable.Id_Responsable}>
            <button className="btn btn-warning" onClick={() => getResponsable(responsable.Id_Responsable)}>Editar</button>
            <button className="btn btn-danger" onClick={() => deleteResponsable(responsable.Id_Responsable)}>Borrar</button>
        </div>
    ]);

    return (
        <>
            <center>
                <h1>Gestionar Responsables</h1>
            </center>
            
            <Sidebar />
            <WriteTable titles={titles} data={data} />

           
            {/* Modal */}
            <div 
                className="modal fade" 
                id="responsableModal" 
                tabIndex="-1" 
                aria-labelledby="responsableModalLabel" 
                aria-hidden="true"
                style={{ display: isFormVisible ? 'block' : 'none' }} // Controlar visibilidad
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="responsableModalLabel">{buttonForm} Responsable</h5>
                            <button 
                                type="button" 
                                className="btn-close" 
                                onClick={closeModal}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {isFormVisible && (
                                <FormResponsable 
                                    buttonForm={buttonForm} 
                                    responsable={responsable} 
                                    URI={URI} 
                                    updateTextButton={updateTextButton} 
                                    setIsFormVisible={setIsFormVisible} 
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CrudResponsable;

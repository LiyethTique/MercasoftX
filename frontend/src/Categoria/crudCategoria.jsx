import axios from 'axios';
import { useState, useEffect } from 'react';
import FormCategoria from '../Categoria/formCategoria.jsx';
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';
import WriteTable from '../Tabla/Data-Table.jsx';

const URI = (process.env.SERVER_BACK || 'http://localhost:3002/') + '/categoria/';

const CrudCategoria = () => {
    const [categoriaList, setCategoriaList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [categoria, setCategoria] = useState({
        Id_Categoria: '',
        Nom_Categoria: ''
    });
    const [isFormVisible, setIsFormVisible] = useState(false); // Estado para mostrar u ocultar el formulario

    useEffect(() => {
        getAllCategoria();
    }, []);

    const getAllCategoria = async () => {
        try {
            const respuesta = await axios.get(URI);
            setCategoriaList(Array.isArray(respuesta.data) ? respuesta.data : []);
        } catch (error) {
            alert(error.response?.data?.message || "Error al obtener las Categorías");
        }
    };

    const getCategoria = async (Id_Categoria) => {
        setButtonForm('Actualizar');
        try {
            const respuesta = await axios.get(URI + Id_Categoria);
            setCategoria({
                Id_Categoria: respuesta.data.Id_Categoria || '',
                Nom_Categoria: respuesta.data.Nom_Categoria || ''
            });
            setIsFormVisible(true); // Mostrar el formulario al editar
        } catch (error) {
            alert('Error al obtener los detalles de la categoría');
        }
    };

    const deleteCategoria = (Id_Categoria) => {
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
                await axios.delete(URI + Id_Categoria);
                Swal.fire({
                    title: "¡Borrado!",
                    text: "El registro ha sido borrado.",
                    icon: "success"
                });
                getAllCategoria(); // Refrescar la lista después de eliminar
            }
        });
    };

    const handleSuccess = () => {
        getAllCategoria(); // Actualizar la lista de categorías después de un cambio
        setIsFormVisible(false); // Cerrar el formulario después de la operación
    };

    const titles = ['Código', 'Nombre Categoría', 'Acciones'];
    const data = categoriaList.map(categoria => [
        categoria.Id_Categoria,
        categoria.Nom_Categoria,
        <div>
            <button className="btn btn-warning" onClick={() => getCategoria(categoria.Id_Categoria)}>Editar</button>
            <button className="btn btn-danger" onClick={() => deleteCategoria(categoria.Id_Categoria)}>Borrar</button>
        </div>
    ]);

    const moduleName = "Gestionar Categorías"; // Aquí capturamos el nombre del módulo

    return (
        <>
            <center><h1>{moduleName}</h1></center>
            <Sidebar />
            <WriteTable titles={titles} data={data} formComponent={FormCategoria} moduleName={moduleName} />
            
            {isFormVisible && (
                <div className="modal fade show d-block" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{buttonForm === 'Actualizar' ? 'Editar Categoría' : 'Registrar Categoría'}</h5>
                                <button type="button" className="btn-close" onClick={() => setIsFormVisible(false)}></button>
                            </div>
                            <div className="modal-body">
                                <FormCategoria
                                    buttonForm={buttonForm}
                                    formData={categoria}
                                    URI={URI}
                                    updateTextButton={setButtonForm}
                                    handleSuccess={handleSuccess} // Llamar al éxito cuando se guarde
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CrudCategoria;
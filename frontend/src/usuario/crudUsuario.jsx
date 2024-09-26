import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from '../Sidebar/Sidebar';
import FormUsuario from './formUsuario';
import WriteTable from '../Tabla/Data-Table';
import UserManagement from './gestUsuario';
import ModalForm from './ModalForm';
import AlertaBDVacia from './AlertaBDVacia';

const URI = (process.env.REACT_APP_SERVER_BACK || 'http://localhost:3002') + '/api/usuarios/';

const CrudUsuario = () => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buttonForm, setButtonForm] = useState('Crear');
    const [selectedUser, setSelectedUser] = useState(null);
    const moduleName = "Gestión de usuarios";

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            const response = await axios.get(URI);
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleShowForm = () => {
        setSelectedUser(null);
        setButtonForm('Crear');
        setIsModalOpen(true);
    };

    const handleSubmitUser = async (userData) => {
        try {
            if (buttonForm === 'Actualizar') {
                // Actualizar usuario existente
                await axios.put(`${URI}${selectedUser.Id_Usuario}`, userData);
                Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
            } else {
                // Crear nuevo usuario
                await axios.post(URI, userData);
                Swal.fire("Éxito", "Usuario creado correctamente", "success");
            }
            setIsModalOpen(false);
            getAllUsers();
        } catch (error) {
            console.error(error);
        }
    };

    const getUser = async (id) => {
        try {
            const response = await axios.get(`${URI}${id}`);
            setSelectedUser(response.data);
            setButtonForm('Actualizar');
            setIsModalOpen(true);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${URI}${id}`);
            Swal.fire("Eliminado", "Usuario eliminado correctamente", "success");
            getAllUsers();
        } catch (error) {
            console.error(error);
        }
    };

    const titles = ['Id', 'Nombre', 'Apellido', 'Correo', 'Rol', 'Acciones'];
    const data = users.map(user => [
        user.Id_Usuario,
        user.Nombre,
        user.Apellido,
        user.Correo,
        user.Rol,
        <div key={user.Id_Usuario}>
            <button className="btn btn-warning me-2" onClick={() => getUser(user.Id_Usuario)} title="Editar">
                <img src="/pencil-square.svg" alt="Editar" style={{ width: '24px', height: '24px' }} />
            </button>
            <button className="btn btn-danger" onClick={() => deleteUser(user.Id_Usuario)} title="Borrar">
                <img src="/archive.svg" alt="Borrar" style={{ width: '24px', height: '24px' }} />
            </button>
        </div>
    ]);

    return (
        <>
            <Sidebar />
            <UserManagement>
                <div className="container mt-4">
                    <center><h1>{moduleName}</h1></center>
                    <div className="d-flex justify-content-between mb-3">
                        <button className="btn btn-success d-flex align-items-center" onClick={handleShowForm}>
                            <img src="/plus-circle (1).svg" alt="Agregar usuario" style={{ width: '20px', height: '20px', marginRight: '8px', filter: 'invert(100%)' }} />
                            Registrar
                        </button>
                    </div>
                    <WriteTable titles={titles} data={data} moduleName={moduleName} />
                    <AlertaBDVacia uri={URI} />
                    <ModalForm
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title={buttonForm === 'Actualizar' ? 'Editar usuario' : 'Crear usuario'}
                        onSubmit={handleSubmitUser}
                    >
                        <FormUsuario
                            user={selectedUser}
                            buttonForm={buttonForm}
                            URI={URI}
                            updateTextButton={setButtonForm}
                            setIsFormVisible={setIsModalOpen}
                            onSubmit={handleSubmitUser}
                        />
                    </ModalForm>
                </div>
            </UserManagement>
        </>
    );
};

export default CrudUsuario;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axios.get('/usuarios');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowForm = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleSubmitUser = async (userData) => {
    try {
      if (selectedUser) {
        // Actualizar usuario existente
        await axios.put(`/usuarios/${selectedUser.Id_Usuario}`, userData);
      } else {
        // Crear nuevo usuario
        await axios.post('/usuarios', userData);
      }
      setIsModalOpen(false);
      getAllUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`/usuarios/${id}`);
      Swal.fire('Eliminado', 'El usuario ha sido eliminado correctamente.', 'success');
      getAllUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Gestión de usuarios</h1>
      <button onClick={handleShowForm}>Crear usuario</button>
      <table>
        <thead>
          <tr>
            <th>Correo</th>
            <th>Responsable</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.Id_Usuario}>
              <td>{user.Cor_Usuario}</td>
              <td>{user.Id_Responsable}</td>
              <td>
                <button onClick={() => setSelectedUser(user)}>Editar</button>
                <button onClick={() => handleDeleteUser(user.Id_Usuario)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedUser ? 'Editar usuario' : 'Crear usuario'}
        onSubmit={handleSubmitUser}
      >
        <UserForm
          user={selectedUser}
          onSubmit={handleSubmitUser}
        />
      </ModalForm>
    </div>
  );
};

export default UserManagement;
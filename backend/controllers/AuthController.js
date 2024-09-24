// controllers/authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import UserModel from '../models/authModel.js';
import Responsable from '../models/responsableModel.js'; // Importa el modelo Responsable

const JWT_LLAVE = process.env.JWT_LLAVE;

export const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) return res.status(403).json({ error: 'Token no proporcionado' });

  try {
    // Verificar y decodificar el token JWT
    const decoded = await promisify(jwt.verify)(token, JWT_LLAVE);
    
    // Buscar el usuario por ID, incluyendo la información del Responsable
    const user = await UserModel.findByPk(decoded.id, {
      include: {
        model: Responsable,
        as: 'responsable', // Usar el alias definido en la asociación
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Agregar el usuario y los detalles del responsable al objeto req
    req.user = user;
    req.userId = decoded.id; // Decodificamos el ID del token JWT

    next(); // Pasar al siguiente middleware o controlador
  } catch (error) {
    console.log('Error al verificar el token:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Generar el token JWT con el ID del usuario
export const generateToken = (user) => {
  return jwt.sign({ id: user.Id_Usuario }, JWT_LLAVE, { expiresIn: '1h' });
};

// Registro de usuario
export const registerUser = async (req, res) => {
  const { Cor_Usuario, Password_Usuario, Id_Responsable } = req.body;
  try {
    const existingUser = await UserModel.findOne({ where: { Cor_Usuario } });
    if (existingUser) {
      return res.status(400).json({ error: 'Correo electrónico ya registrado' });
    }

    const hashedPassword = await bcrypt.hash(Password_Usuario, 10);

    const user = await UserModel.create({
      Cor_Usuario,
      Password_Usuario: hashedPassword,
      Id_Responsable, // Ahora incluye el campo Id_Responsable
    });

    res.status(201).json({ message: 'Usuario creado', user });
  } catch (error) {
    console.log('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Login de usuario
export const loginUser = async (req, res) => {
  const { Cor_Usuario, Password_Usuario } = req.body;
  try {
    const user = await UserModel.findOne({
      where: { Cor_Usuario },
      include: {
        model: Responsable,
        as: 'responsable', // Alias corregido
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(Password_Usuario, user.Password_Usuario);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    console.log('Error en el proceso de login:', error);
    res.status(500).json({ error: 'Error en el proceso de login' });
  }
};

// Consultar usuario por ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByPk(id, {
      include: {
        model: Responsable,
        as: 'responsable', // Usar el alias 'responsable'
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ 
      Id_Usuario: user.Id_Usuario,
      Cor_Usuario: user.Cor_Usuario,
      Id_Responsable: user.Id_Responsable,
      Responsable: user.responsable, // Devuelve también los datos del Responsable
    });
  } catch (error) {
    console.log('Error al consultar usuario por ID:', error);
    res.status(500).json({ error: 'Error al consultar usuario por ID' });
  }
};

// Obtener todos los usuarios (solo admin)
export const getAllUsers = async (req, res) => {
  try {
    // Verificar si el usuario tiene privilegios de administrador
    if (req.user.responsable.Tip_Responsable !== 'Administrador') { // Usar el alias 'responsable'
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    const users = await UserModel.findAll({
      include: {
        model: Responsable,
        as: 'responsable', // Usar el alias 'responsable'
      },
    });
    res.json(users);
  } catch (error) {
    console.log('Error al obtener todos los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Eliminar un usuario (solo admin)
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Verificar si el usuario tiene privilegios de administrador
    if (req.user.responsable.Tip_Responsable !== 'Administrador') { // Usar el alias 'responsable'
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await user.destroy();
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    console.log('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

// Actualizar un usuario (solo admin)
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { Cor_Usuario, Password_Usuario, Id_Responsable } = req.body;
  try {
    // Verificar si el usuario tiene privilegios de administrador
    if (req.user.responsable.Tip_Responsable !== 'Administrador') { // Usar el alias 'responsable'
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (Cor_Usuario) user.Cor_Usuario = Cor_Usuario;
    if (Password_Usuario) user.Password_Usuario = await bcrypt.hash(Password_Usuario, 10);
    if (Id_Responsable) user.Id_Responsable = Id_Responsable;

    await user.save();
    res.json({ message: 'Usuario actualizado', user });
  } catch (error) {
    console.log('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};
// controllers/authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import UserModel from '../models/authModel.js';
import Responsable from '../models/responsableModel.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { Op } from 'sequelize';

const JWT_LLAVE = process.env.JWT_LLAVE;

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Solicitar restablecimiento de contraseña
export const requestPasswordReset = async (req, res) => {
  const { Cor_Usuario } = req.body;
  try {
    const user = await UserModel.findOne({ where: { Cor_Usuario } });
    if (!user) {
      return res.status(404).json({ error: 'Correo no registrado' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expires = Date.now() + 3600000;

    user.ResetPasswordToken = token;
    user.ResetPasswordExpires = expires;
    await user.save();

    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    const mailOptions = {
      to: user.Cor_Usuario,
      from: process.env.EMAIL_USER,
      subject: 'Recuperación de contraseña',
      text: `Recibimos una solicitud para restablecer tu contraseña. Haz clic en el siguiente enlace:\n\n${resetURL}\n\nEste enlace expirará en una hora.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Correo de recuperación enviado' });
  } catch (error) {
    console.error('Error al solicitar la recuperación de contraseña:', error);
    res.status(500).json({ error: 'Error al solicitar la recuperación de contraseña' });
  }
};

// Restablecer contraseña
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { Password_Usuario } = req.body;

  try {
    const user = await UserModel.findOne({
      where: {
        ResetPasswordToken: token,
        ResetPasswordExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'Token inválido o expirado' });
    }

    const hashedPassword = await bcrypt.hash(Password_Usuario, 10);
    user.Password_Usuario = hashedPassword;
    user.ResetPasswordToken = null;
    user.ResetPasswordExpires = null;

    await user.save();

    res.json({ message: 'Contraseña restablecida con éxito' });
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json({ error: 'Error al restablecer la contraseña' });
  }
};

export const verificarToken = async (token) => {
  // Implementa tu lógica de verificación aquí
  return true; // O false dependiendo de la verificación
};

export const someFunction = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Asegúrate de obtener el token del header

  if (!token) {
    return res.status(400).json({ message: 'Token no proporcionado.' });
  }

  const isValidToken = await verificarToken(token);

  if (!isValidToken) {
    return res.status(400).json({ message: 'Token no válido.' });
  }

  // Continúa con la lógica si el token es válido
  return res.status(200).json({ message: 'Token válido.' });
};



// Verificar token (middleware)
export const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(403).json({ error: 'Token no proporcionado' });

  try {
    const decoded = await promisify(jwt.verify)(token, JWT_LLAVE);
    
    // Buscar el usuario por ID, incluyendo la información del Responsable
    const user = await UserModel.findByPk(decoded.id, {
      include: {
        model: Responsable,
        as: 'responsable', // Asegúrate de que esta relación esté definida en tu modelo
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    req.user = user;
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.log('Error al verificar el token:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
};



// Generar el token JWT con el ID del usuario y el campo Tip_Responsable
export const generateToken = (user) => {
  return jwt.sign({ 
    id: user.Id_Usuario,
    Tip_Responsable: user.responsable ? user.responsable.Tip_Responsable : null // Incluyendo el campo Tip_Responsable
  }, JWT_LLAVE, { expiresIn: '1h' });
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
      Id_Responsable,
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
        as: 'responsable', // Asegúrate de que esta relación esté definida en tu modelo
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
        as: 'responsable', // Asegúrate de que esta relación esté definida en tu modelo
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ 
      Id_Usuario: user.Id_Usuario,
      Cor_Usuario: user.Cor_Usuario,
      Id_Responsable: user.Id_Responsable,
      Responsable: user.responsable,
    });
  } catch (error) {
    console.log('Error al consultar usuario por ID:', error);
    res.status(500).json({ error: 'Error al consultar usuario por ID' });
  }
};

// Obtener todos los usuarios (solo admin)
export const getAllUsers = async (req, res) => {
  try {
    if (req.user.responsable && req.user.responsable.Tip_Responsable !== 'Administrador') {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    const users = await UserModel.findAll({
      include: {
        model: Responsable,
        as: 'responsable', // Asegúrate de que esta relación esté definida en tu modelo
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
    if (req.user.responsable && req.user.responsable.Tip_Responsable !== 'Administrador') {
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
    if (req.user.responsable && req.user.responsable.Tip_Responsable !== 'Administrador') {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    user.Cor_Usuario = Cor_Usuario || user.Cor_Usuario;
    if (Password_Usuario) {
      user.Password_Usuario = await bcrypt.hash(Password_Usuario, 10);
    }
    user.Id_Responsable = Id_Responsable || user.Id_Responsable;

    await user.save();
    res.json({ message: 'Usuario actualizado', user });
  } catch (error) {
    console.log('Error al actualizar el usuario:', error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

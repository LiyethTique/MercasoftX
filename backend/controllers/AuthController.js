import bcrypt from 'bcrypt'; // Revisa si prefieres bcrypt o bcryptjs
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import UserModel from '../models/authModel.js';

const JWT_LLAVE = process.env.JWT_LLAVE; // Corrección de JTW a JWT

// Generar el token JWT con el ID del usuario
export const generateToken = (user) => {
  return jwt.sign({ id: user.Id_Usuario }, JWT_LLAVE, { expiresIn: '1h' });
};

// Registro de usuario
// Registro de usuario
// Registro de usuario
export const registerUser = async (req, res) => {
  const { Cor_Usuario, Password_Usuario } = req.body;
  try {
    // Verificar si el correo ya está registrado
    const existingUser = await UserModel.findOne({ where: { Cor_Usuario } });
    if (existingUser) {
      return res.status(400).json({ error: 'Correo electrónico ya registrado' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(Password_Usuario, 10);

    // Guardar el usuario en la base de datos
    const user = await UserModel.create({
      Cor_Usuario,
      Password_Usuario: hashedPassword // Usa el hash de la contraseña
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
    console.log('JWT_LLAVE:', JWT_LLAVE); // Agrega este log para verificar si JWT_LLAVE está correctamente configurada

    // Buscar al usuario por su correo
    const user = await UserModel.findOne({ where: { Cor_Usuario } });
    console.log(user)
    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Mostrar contraseñas para depuración
    console.log(`Contraseña ingresada: ${Password_Usuario}`);
    console.log(`Contraseña almacenada (hash): ${user.Password_Usuario}`);

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(Password_Usuario, user.Password_Usuario);
    console.log(`¿Contraseña válida?: ${isPasswordValid}`);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Generar el token
    const token = generateToken(user);
    res.json({  token });
  } catch (error) {
    console.log('Error en el proceso de login:', error);
    res.status(500).json({ error: 'Error en el proceso de login' });
  }
};


// Verificación del token JWT
export const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'Token no proporcionado' });

  try {
    const decoded = await promisify(jwt.verify)(token, JWT_LLAVE);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Consultar usuario por ID
export const getUserById = async (req, res) => {
  const { id } = req.params; // Obtener el ID del parámetro de la ruta

  try {
    // Buscar al usuario por su ID
    const user = await UserModel.findByPk(id); // Usar findByPk para buscar por ID

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ user });
  } catch (error) {
    console.log('Error al consultar usuario por ID:', error);
    res.status(500).json({ error: 'Error al consultar usuario por ID' });
  }
  
};
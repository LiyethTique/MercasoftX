import bcryptjs from 'bcryptjs'; // Revisa si prefieres bcrypt o bcryptjs
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import UserModel from '../models/authModel.js';

const JWT_LLAVE = process.env.JWT_LLAVE; // Corrección de JTW a JWT

// Generar el token JWT con el ID del usuario
export const generateToken = (user) => {
  return jwt.sign({ id: user.id }, JWT_LLAVE, { expiresIn: '1h' });
};

// Registro de usuario
export const registerUser = async (req, res) => {
  const { Cor_Usuario, Password_Usuario } = req.body;
  try {
    // Hash de la contraseña
    const hashedPassword = await bcryptjs.hash(Password_Usuario, 10);

    // Guardar el usuario en la base de datos
    const user = await UserModel.create({
      Cor_Usuario,
      Password_Usuario: hashedPassword
    });

    res.status(201).json({ message: 'Usuario creado', user });
  } catch (error) {
    console.log('Error al registrar usuario:', error); // Añadir log para ver detalles del error
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Login de usuario
export const loginUser = async (req, res) => {
  const { Cor_Usuario, Password_Usuario } = req.body;
  try {
    // Buscar al usuario por su correo
    const user = await UserModel.findOne({ where: { Cor_Usuario } });
    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Mostrar contraseñas para depuración
    console.log(`Contraseña ingresada: ${Password_Usuario}`);
    console.log(`Contraseña almacenada (hash): ${user.Password_Usuario}`);

    // Verificar la contraseña
    const isPasswordValid = await bcryptjs.compare(Password_Usuario, user.Password_Usuario);
    console.log(`¿Contraseña válida?: ${isPasswordValid}`);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Generar el token
    const token = generateToken(user);
    res.json({ message: 'Login exitoso', token });
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

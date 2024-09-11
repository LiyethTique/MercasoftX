import bcrypt from 'bcryptjs';
import jwt from'jsonwebtoken';
import { promisify } from 'util';

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
};

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  // Guardar en base de datos, ejemplo:
  const user = await User.create({ username, password: hashedPassword });
  res.status(201).json({ message: 'Usuario creado', user });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ error: 'Contraseña incorrecta' });

  const token = generateToken(user);
  res.json({ message: 'Login exitoso', token });
};

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'Token no proporcionado' });

  try {
    const decoded = await promisify(jwt.verify)(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = { registerUser, loginUser, verifyToken };
// routes/authRoutes.js

import express from 'express';
import { registerUser, loginUser, verifyToken, getAllUsers, deleteUser, updateUser, getUserById } from '../controllers/AuthController.js';
import userRoutes from './userRoutes.js'; // Importar las rutas de usuarios

const router = express.Router();

router.post('/register', registerUser); // Ruta de registro (sin protección)
router.post('/login', loginUser); // Ruta de login (sin protección)

router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: `Bienvenido, usuario con ID ${req.userId}.` });
});

router.get('/protected-route', verifyToken, (req, res) => {
  res.json({ message: 'Acceso a una ruta protegida.' });
});

//gestión de usuarios (solo admin)


export default router;
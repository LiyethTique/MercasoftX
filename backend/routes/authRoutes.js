import express from 'express';
import { registerUser, loginUser, verifyToken } from '../controllers/AuthController.js';


const router = express.Router();

router.post('/register', registerUser); // Ruta de registro (sin protección)
router.post('/login', loginUser); // Ruta de login (sin protección)

// Rutas protegidas
router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: `Bienvenido, usuario con ID ${req.userId}.` });
});

router.get('/protected-route', verifyToken, (req, res) => {
  res.json({ message: 'Acceso a una ruta protegida.' });
});

export default router;
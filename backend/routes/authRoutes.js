// routes/authRoutes.js

import express from 'express';
import { registerUser, loginUser, verifyToken, requestPasswordReset, resetPassword, verificarToken } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/register', registerUser); // Ruta de registro (sin protección)
router.post('/login', loginUser); // Ruta de login (sin protección)

router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: `Bienvenido, usuario con ID ${req.userId}.` });
});

router.get('/protected-route', verifyToken, (req, res) => {
  res.json({ message: 'Acceso a una ruta protegida.' });
});

router.post('/recuperar-contrasena', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);

// Ejemplo de código en el backend (Node.js con Express)
router.get('/reset-password/:token/verify', async (req, res) => {
  const { token } = req.params;
  
  // Lógica para verificar el token
  const isValidToken = await verificarToken(token); // Implementa tu lógica de verificación
  if (isValidToken) {
    return res.json({ valid: true });
  } else {
    return res.json({ valid: false });
  }
});

//gestión de usuarios (solo admin)


export default router;
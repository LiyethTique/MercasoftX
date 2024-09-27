// routes/userRoutes.js
import express from 'express';
import { verifyToken, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/AuthController.js';

const router = express.Router();

const checkSuperAdmin = (req, res, next) => {
    if (req.user && req.user.responsable && req.user.responsable.Tip_Responsable === 'Administrador') {
      next();
    } else {
      res.status(403).json({ error: 'No tienes permiso para acceder a esta ruta' });
    }
  };
  

// Rutas protegidas que requieren autenticación
router.get('/', verifyToken, checkSuperAdmin, getAllUsers); // Obtener todos los usuarios
router.get('/:id', verifyToken, checkSuperAdmin, getUserById); // Obtener usuario por ID
router.put('/:id', verifyToken, checkSuperAdmin, updateUser); // Actualizar usuario
router.delete('/:id', verifyToken, checkSuperAdmin, deleteUser); // Eliminar usuario

export default router;

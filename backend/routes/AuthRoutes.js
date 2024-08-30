import express from 'express';
import { createUser, verifyToken, loginUser, getResetPassword, setNewPassword } from '../controllers/AuthController.js';
import { check, validationResult } from 'express-validator';

const router = express.Router();

// Crear usuario
router.post('/',
    [
        check('Cor_Usuario', 'Por favor ingrese un email válido').isEmail(),
        check('Password_Usuario', 'Por favor ingrese una contraseña con más de 8 caracteres').isLength({ min: 8 })
    ],
    createUser
);

// Verificar token
router.post('/verify', verifyToken);

// Iniciar sesión
router.post('/Login', 
    [
        check('email', 'Por favor ingrese un email válido').isEmail(),
        check('password', 'Por favor ingrese una contraseña').exists()
    ],
    loginUser
);

// Solicitar restablecimiento de contraseña
router.post('/request-password-reset',
    [
        check('email', 'Por favor ingrese un email válido').isEmail()
    ],
    getResetPassword
);

// Restablecer contraseña
router.post('/reset-password',
    [
        check('tokenForPassword', 'Token es requerido').exists(),
        check('newPassword', 'Por favor ingrese una nueva contraseña con más de 6 caracteres').isLength({ min: 6 })
    ],
    setNewPassword
);

export default router;
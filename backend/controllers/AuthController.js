import bcryptjs from 'bcryptjs';
import UserModel from '../models/AuthModel.js';
import jwt from 'jsonwebtoken';
import { sendPasswordResetEmail } from '../servicios/emailServices.js';

// Obtener la clave secreta de JWT del entorno
const JTW_LLAVE = process.env.JWT_LLAVE;

export const createUser = async (req, res) => {
    const { Cor_Usuario, Password_Usuario } = req.body;

    if (!Cor_Usuario || !Password_Usuario) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const user = await UserModel.findOne({ where: { Cor_Usuario } });

        if (user) {
            return res.status(400).json({ message: "El Usuario ya existe" });
        }

        const passHash = await bcryptjs.hash(Password_Usuario, 8);

        await UserModel.create({
            Cor_Usuario,
            Password_Usuario: passHash
        });

        const tokenUser = jwt.sign({ user: { email: Cor_Usuario } }, JTW_LLAVE, { expiresIn: '4h' });

        res.json({ tokenUser, message: "Usuario creado de manera exitosa." });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const verifyToken = (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado' });
    }

    try {
        const verified = jwt.verify(token, JTW_LLAVE);
        req.user = verified.user;
        return res.status(200).json({ message: 'Token verificado' });
    } catch (error) {
        return res.status(401).json({ message: 'Token no válido' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos' });
        }

        const user = await UserModel.findOne({ where: { Cor_Usuario: email } });

        if (!user || !bcryptjs.compareSync(password, user.Password_Usuario)) {
            return res.status(401).json({ message: 'Usuario o clave inválidos' });
        }

        const tokenUser = jwt.sign({ user: { email: user.Cor_Usuario } }, process.env.JWT_LLAVE, { expiresIn: '4h' });

        res.json({ tokenUser });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getResetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findOne({ where: { Cor_Usuario: email } });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const tokenForPassword = jwt.sign({ user: { id: user.Id_Usuario, email: user.Cor_Usuario } }, JTW_LLAVE, { expiresIn: '30m' });

        await sendPasswordResetEmail(email, tokenForPassword);
        res.status(200).json({ message: 'El mensaje para restablecer contraseña fue enviado correctamente' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const setNewPassword = async (req, res) => {
    const { tokenForPassword, newPassword } = req.body;

    try {
        const decoded = jwt.verify(tokenForPassword, JTW_LLAVE);
        const user = await UserModel.findByPk(decoded.user.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const passHash = await bcryptjs.hash(newPassword, 8);

        await UserModel.update(
            { Password_Usuario: passHash },
            { where: { Id_Usuario: user.Id_Usuario } }
        );

        res.status(200).json({ message: 'Contraseña actualizada correctamente' });

    } catch (error) {
        res.status(400).json({ message: 'Información inválida o el tiempo ha expirado' });
    }
}
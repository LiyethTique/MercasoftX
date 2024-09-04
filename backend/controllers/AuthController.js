import bcrypt from 'bcrypt'
import UserModel from '../models/AuthModel.js'
import jwt from 'jsonwebtoken'
import { sendPasswordResetEmail } from '../servicios/emailServices.js'

export const createUser = async (req, res) => {

    const { Cor_Usuario, Password_Usuario } = req.body;

    if (!Cor_Usuario || !Password_Usuario) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const { name, email, password } = req.body
        console.log(password)

        let userOk = await UserModel.findOne({ where: { Cor_Usuario: Cor_Usuario } });
        if (userOk) {
            return res.json({ message: "El Usuario ya existe" });
        }
        else {

            let passHash = await bcrypt.hash(Password_Usuario, 8);
            await UserModel.create({
                Cor_Usuario: Cor_Usuario,
                Password_Usuario: passHash
            });

            const tokenUser = jwt.sign({ user: { Cor_Usuario: Cor_Usuario } }, process.env.JWT_LLAVE, { expiresIn: '4h' });
            console.log("TOKEN:" + tokenUser);
            res.json({ tokenUser, message: "Usuario creado de manera exitosa." });

        }

    } catch (error) {
        res.json({ "message": error })
    }
}

export const verifyToken = (req, res) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Acceso denegado, falta el token' });
    }

    const token = authHeader.replace('Bearer ', '').trim();
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, token inválido' });
    }

    try {
        // Verificar el token aquí usando jwt.verify
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Puedes almacenar la información decodificada en req.user si es necesario
        return res.status(200).json({ message: 'Token válido', user: decoded }); // Respuesta si el token es válido
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
}


export const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const userOk = await UserModel.findOne({ where: { Cor_Usuario: email } });
        if (!userOk || !bcrypt.compareSync(password, userOk.Password_Usuario)) {
            return res.status(401).json({ message: 'Usuario o clave inválidos' });
        }
        const tokenUser = jwt.sign({ user: { Cor_Usuario: userOk.Cor_Usuario } }, process.env.JWT_LLAVE, { expiresIn: '4h' });
        res.json({ tokenUser });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }


}

export const getResetPassword = async (req, res) => {
    const { email } = req.body

    const user = UserModel.findOne({ where: { email: email } })

    if (!user) {
        res.status(404).json({ message: 'usuario no encotrado' })
    } else {
        const tokenForPassword = jwt.sign({ user: { id: user.id, name: user.name, email: user.email } }, process.env.JWT_LLAVE, {
            expiresIn: '30m'
        })

        await sendPasswordResetEmail(email, tokenForPassword)
        res.status(200).json({ message: 'El mensaje para restablecer contraseña fue enviado correctamente' })
    }
}

export const setNewPassword = async (req, res) => {
    const { tokenForPassword, newPassword } = req.body

    try {
        const decodificado = jwt.verify(tokenForPassword, process.env.JWT_LLAVE);
        const user = await UserModel.findByPk(decodificado.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        let passHash = await bcrypt.hash(newPassword, 8);
        await UserModel.update({ Password_Usuario: passHash }, { where: { Id_Usuario: decodificado.user.id } });
        res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        res.status(400).json({ message: 'Información inválida o el tiempo ha expirado' })
    }
}
import bcrypt from 'bcrypt'
import UserModel from '../models/AuthModel.js'


import jwt from 'jsonwebtoken'
import { sendPasswordResetEmail } from '../servicios/emailServices.js'

export const createUser = async (req, res) => {
    
    const { Nom_Usuario, Cor_Usuario} = req.body;

    if (!Nom_Usuario || !Cor_Usuario) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const { name, email, password} = req.body
        console.log(password)

        let userOk = await UserModel.findOne({ where: {email: email}})

        if (user){
            res.json({"message": "El Usuario ya existe"})
        } else {

        let passHash = await bcrypt.hash(password, 8)

        await UserModel.create({
            "name": name,
            "email": email,
            "password": passHash
        })
        const tokenUser =jwt.sign({user: {email:userOk.email}}, process.env.JWT_LLAVE, { expiresIn: '4h'})

        console.log("TOKEN:" + tokenUser)
        res.json({tokenUser})

        res.json({"message": "usuario creado de manera exitosa."})
    }

    } catch (error) {
        res.json({"message": error})
    }
}

export const verifyToken = (req, res) => {
     
    const token = req.header('Authorization').replace('Bearer', '')
    if (!token) {
        res.status(401).json({ message: 'Acceso denegado'})
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const userOk = await UserModel.findOne({ where: {email: email}})
        if(!userOk || !bcrypt.compareSync(password)) {
            res.status(401).json({ message: 'Usuario o clave invalidos'})
        }else {
            const tokenUser = jwt.sign({user: {email: userOk.email}}, process.env.JWT_LLAVE, {expiresIn: '4h'})
            res.json({tokenUser})
        } 
    }catch (error) {
        res.status(500).json({ message: error.message })
    }

   
}

export const getResetPassword = async(req, res) => {
    const {email} = req.body

    const user = UserModel.findOne({where:{email: email}})

    if(!user) {
        res.status(404).json({message: 'usuario no encotrado'})
    } else {
        const tokenForPassword = jwt.sign({ user: {id: user.id, name: user.name, email: user.email}}, process.env.JWT_LLAVE, {
            expiresIn: '30m'})

            await sendPasswordResetEmail(email, tokenForPassword)
            res.status(200).json({ message: 'El mensaje para restablecer contraseña fue enviado correctamente'})
    }
}

export const setNewPassword = async (req, res) => {
    const {tokenForPassword, newPassword} = req.body

    try {
        const decodificado = jwt.verify(tokenForPassword, process.env.JWT_LLAVE)
        const user = await UserModel.findByPk(decodificado.id)

        if (!user) {
            res.status(404).json({message: 'Usuario no encontrado'})
        } else{
            let passHash = await bcrypt.hash(newPassword, 6)

            await UserModel.update({
                password: passHash
            },{ where: {id: decodificado.user.id}})
            res.status(200).json({message: 'Contraseña actualizada correctamente'})
        }
    } catch (error) {
        res.status(400).json({ message: 'Información inválida o el tiempo ha expirado'})
    }
}

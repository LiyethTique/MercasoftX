import express from 'express'
import { createUser, verifyToken, loginUser, getResetPassword, setNewPassword } from '../controllers/AuthController.js'
import { check } from 'express-validator'

const router =express.Router()

router.post('/',
    [
        check('email', 'Por favor digite un email valido').isEmail(),
        check('password', 'Por favor ingrese un password con mas de 8 caracteres').isLength({min: 8})
    ],
    createUser)

    router.get('/verify', verifyToken)
    router.post('/login', loginUser)

    router.post('/request_password-reset', getResetPassword)
    router.post('reset-password', setNewPassword)

export default router
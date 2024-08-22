import nodeMailer from 'nodemailer'

export const transportador = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'leongarciajuanesteban@gmail.com',
        pass: 'aquí va la contraseña sin espacios'
    }
})

export const sendPasswordResetEmail = async (email, tokenForPassword) => {

    const RESET_URL = `http://localhost:5173/reset-password?llave=${tokenForPassword}`
    const mailOptions = {
        from: 'leongarciajuanesteban.com',
        to: email,
        subject: 'Restablecer contraseña',
        text: `Por favor use el siguiente enlace para restablecer su contraseña: ${RESET_URL}`
    }

    await transportador.sendMail(mailOptions)
}
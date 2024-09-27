import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import { User } from '../models/authModel.js'; // Asegúrate de importar tu modelo de usuario correctamente

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'No se encontró ningún usuario con ese correo.' });
    }

    // Generar un token JWT con el ID del usuario y un tiempo de expiración (1 hora)
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_LLAVE,
      { expiresIn: '1h' }
    );

    // Configurar el servicio de correo (Nodemailer)
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: user.email,
        pass: user.pass,
      },
    });

    const mailOptions = {
      to: user.email,
      from: user,
      subject: 'Recuperación de Contraseña',
      text: `
        Has solicitado restablecer tu contraseña.
        Haz clic en el siguiente enlace o cópialo en tu navegador para continuar:
        http://tu-app.com/reset-password?t=${token}
        Este enlace será válido por una hora.
      `,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Correo de recuperación enviado.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar la solicitud.', error });
  }
};

// Controlador para restablecer la contraseña
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_LLAVE);
    
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Cifrar la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Contraseña restablecida con éxito.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al restablecer la contraseña.', error });
  }
};

import UserModel from '../models/authModel.js';
import Responsable from '../models/responsableModel.js';

export const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener solo el token

  console.log("Token recibido:", token); // Verifica que se esté recibiendo el token

  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado. Acceso denegado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_LLAVE);
    const user = await UserModel.findByPk(decoded.id, {
      include: {
        model: Responsable,
        as: 'responsable', // Asegúrate de que este alias coincida con tu asociación
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    req.user = user; // Guarda el objeto de usuario completo
    next(); // Si el token es válido, continuamos
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado. Por favor, inicia sesión nuevamente.' });
  }
};

import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado. Acceso denegado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_LLAVE);
    req.userId = decoded.id; // Guardamos el ID del usuario para futuras referencias
    next(); // Si el token es válido, continuamos
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado. Por favor, inicia sesión nuevamente.' });
  }
};
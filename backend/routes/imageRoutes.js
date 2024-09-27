const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const multer = require('multer');

// Configurar Multer para almacenar las imágenes en la carpeta 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Ruta para subir imágenes
router.post('/upload', upload.single('image'), imageController.uploadImage);

export default router;
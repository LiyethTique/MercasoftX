import Producto from "../models/productoModel.js";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import multer from "multer";

// Configuración de logger con winston
const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      (info) => `${info.timestamp}: ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new DailyRotateFile({
      filename: "logs/producto-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
    }),
  ],
});

// Configuración de multer para subir archivos (imágenes)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único con la fecha actual
  },
});

export const upload = multer({ storage });

// Función para subir imagen y crear producto
export const uploadImage = async (req, res) => {
  const {
    Nom_Producto,
    Car_Producto,
    Exi_Producto,
    Fec_Vencimiento,
    Id_Unidad,
    Uni_DeMedida,
    Pre_Producto,
  } = req.body;
  const imagen = req.file ? req.file.filename : null;

  if (
    !Nom_Producto ||
    !Car_Producto ||
    !Exi_Producto ||
    !Fec_Vencimiento ||
    !Id_Unidad ||
    !Uni_DeMedida ||
    Pre_Producto === undefined
  ) {
    logger.warn("Todos los campos son obligatorios");
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const producto = await Producto.create({
      Nom_Producto,
      Car_Producto,
      Exi_Producto,
      Ima_Producto: imagen ? `/uploads/${imagen}` : null, // Guardar la ruta de la imagen
      Fec_Vencimiento,
      Id_Unidad,
      Uni_DeMedida,
      Pre_Producto,
    });
    res.status(201).json({ message: "Producto creado exitosamente", producto });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

// Obtener todos los productos
export const getAllProducto = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    if (productos.length > 0) {
      res.status(200).json(productos);
    } else {
      res.status(400).json({ message: "No existen productos" });
    }

    res.status(200).json({ message: "" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

// Obtener un producto por ID
export const getProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};

// Actualizar un producto por ID
export const updateProducto = async (req, res) => {
  const {
    Nom_Producto,
    Car_Producto,
    Exi_Producto,
    Fec_Vencimiento,
    Id_Unidad,
    Uni_DeMedida,
    Pre_Producto,
  } = req.body;
  const imagen = req.file ? req.file.filename : null;

  try {
    const updated = await Producto.update(
      {
        Nom_Producto,
        Car_Producto,
        Exi_Producto,
        Ima_Producto: imagen ? `/uploads/${imagen}` : null,
        Fec_Vencimiento,
        Id_Unidad,
        Uni_DeMedida,
        Pre_Producto,
      },
      {
        where: { Id_Producto: req.params.id },
      }
    );

    if (updated[0]) {
      const updatedProducto = await Producto.findByPk(req.params.id);
      res
        .status(200)
        .json({
          message: "Producto actualizado exitosamente",
          updatedProducto,
        });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

// Eliminar un producto por ID
export const deleteProducto = async (req, res) => {
  try {
    const deleted = await Producto.destroy({
      where: { Id_Producto: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: "Producto eliminado exitosamente" });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};

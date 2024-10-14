import Producto from "../models/productoModel.js";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import multer from "multer";
import { Unidad } from "../app.js";
import fs from 'fs';

// Configuración de logger con winston
const logger = winston.createLogger({
    level: "error",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(info => `${info.timestamp}: ${info.level}: ${info.message}`)
    ),
    transports: [
        new DailyRotateFile({
            filename: 'logs/producto-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d'
        })
    ]
});

// Configuración de multer para subir archivos (imágenes) con identificador único
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        // Crear un nombre único usando la fecha y hora actual formateada
        const uniqueSuffix = new Date().toISOString().replace(/[-T:.Z]/g, '') + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);  // Nombre único con la fecha y hora
    }
});

export const upload = multer({ storage });

// Función para subir imagen y crear producto
export const uploadImage = async (req, res) => {
    const { Nom_Producto, Car_Producto, Exi_Producto, Fec_Vencimiento, Id_Unidad, Uni_DeMedida, Pre_Producto } = req.body;
    const imagen = req.file ? req.file.filename : null;

    if (!Nom_Producto || !Exi_Producto || !Fec_Vencimiento || !Id_Unidad || !Uni_DeMedida || Pre_Producto === undefined) {
        logger.warn('Algunos campos obligatorios están faltando');
        return res.status(400).json({ message: 'Todos los campos, excepto Car_Producto, son obligatorios' });
    }

    try {
        const producto = await Producto.create({
            Nom_Producto,
            Car_Producto: Car_Producto || null,  // Si Car_Producto no se proporciona, se asigna como null
            Exi_Producto,
            Ima_Producto: imagen ? `/uploads/${imagen}` : null,  // Guardar la ruta de la imagen
            Fec_Vencimiento,
            Id_Unidad,
            Uni_DeMedida,
            Pre_Producto
        });
        res.status(201).json({ message: 'Producto creado exitosamente', producto });
    } catch (error) {
        logger.error(`Error al crear producto: ${error.message}\nStack: ${error.stack}`);
        res.status(500).json({ message: 'Error interno al crear el producto', error: error.message });
    }
};

// Obtener todos los productos
export const getAllProducto = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            include: [
                {
                    model: Unidad,
                    as: 'unidad',
                }
            ]
        });

        if (productos.length > 0) {
            res.status(200).json(productos);
        } else {
            res.status(404).json({ message: 'No existen productos en la base de datos' });
        }
    } catch (error) {
        logger.error(`Error al obtener productos: ${error.message}\nStack: ${error.stack}`);
        res.status(500).json({ message: 'Error interno al obtener los productos', error: error.message });
    }
};

// Obtener un producto por ID
export const getProducto = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id, {
            include: [
                {
                    model: Unidad,
                    as: 'unidad',
                }
            ]
        });

        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        logger.error(`Error al obtener producto por ID: ${error.message}\nStack: ${error.stack}`);
        res.status(500).json({ message: 'Error interno al obtener el producto', error: error.message });
    }
};

// Actualizar un producto por ID
export const updateProducto = async (req, res) => {
    const { Nom_Producto, Car_Producto, Exi_Producto, Fec_Vencimiento, Id_Unidad, Uni_DeMedida, Pre_Producto } = req.body;
    const nuevaImagen = req.file ? req.file.filename : null;

    try {
        // Buscar el producto actual
        const producto = await Producto.findByPk(req.params.id);

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        let imagenActual = producto.Ima_Producto;

        // Si se ha subido una nueva imagen, eliminar la antigua y actualizar la ruta
        if (nuevaImagen) {
            if (imagenActual) {
                // Obtener la ruta de la imagen anterior eliminando el prefijo '/uploads/'
                const imagenAntiguaPath = path.join('uploads', path.basename(imagenActual));

                // Eliminar la imagen antigua del servidor
                fs.unlink(imagenAntiguaPath, (err) => {
                    if (err) {
                        logger.error(`Error al eliminar la imagen antigua: ${err.message}`);
                    }
                });
            }

            // Asignar la nueva imagen
            imagenActual = `/uploads/${nuevaImagen}`;
        }

        // Actualizar el producto con la nueva imagen o la existente
        const updated = await Producto.update({
            Nom_Producto,
            Car_Producto: Car_Producto || null,
            Exi_Producto,
            Ima_Producto: imagenActual,  // Mantener la imagen actual si no se sube una nueva
            Fec_Vencimiento,
            Id_Unidad,
            Uni_DeMedida,
            Pre_Producto
        }, {
            where: { Id_Producto: req.params.id }
        });

        if (updated[0]) {
            const updatedProducto = await Producto.findByPk(req.params.id);
            res.status(200).json({ message: 'Producto actualizado exitosamente', updatedProducto });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        logger.error(`Error al actualizar producto: ${error.message}\nStack: ${error.stack}`);
        res.status(500).json({ message: 'Error interno al actualizar el producto', error: error.message });
    }
};

// Eliminar un producto por ID
export const deleteProducto = async (req, res) => {
    try {
        // Buscar el producto para obtener la información de la imagen
        const producto = await Producto.findByPk(req.params.id);

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Obtener la ruta de la imagen del producto
        const imagenActual = producto.Ima_Producto;

        // Eliminar el producto de la base de datos
        const deleted = await Producto.destroy({
            where: { Id_Producto: req.params.id }
        });

        if (deleted) {
            // Si el producto tiene una imagen asociada, eliminarla del servidor
            if (imagenActual) {
                const imagenPath = path.join('uploads', path.basename(imagenActual));
                
                // Eliminar la imagen del sistema de archivos
                fs.unlink(imagenPath, (err) => {
                    if (err) {
                        logger.error(`Error al eliminar la imagen del producto: ${err.message}`);
                    }
                });
            }

            res.status(200).json({ message: 'Producto eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        logger.error(`Error al eliminar producto: ${error.message}\nStack: ${error.stack}`);
        res.status(500).json({ message: 'Error interno al eliminar el producto', error: error.message });
    }
};
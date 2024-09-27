import Area from "../models/areaModel.js"; // Asegúrate de que el modelo Area esté correctamente definido
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logger = winston.createLogger({
    level: "error",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(info => `${info.timestamp}: ${info.level}: ${info.message}`)
    ),
    transports: [
        new DailyRotateFile({
            filename: 'logs/area-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d'
        })
    ]
});

export const getAllAreas = async (req, res) => {
    try {
        const areas = await Area.findAll();
        if (areas.length > 0) {
            res.status(200).json(areas);
            return;
        }
        res.status(200).json([]);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al obtener áreas' });
    }
};

export const getArea = async (req, res) => {
    try {
        const area = await Area.findByPk(req.params.id);
        if (area) {
            res.status(200).json(area);
        } else {
            res.status(404).json({ message: 'Área no encontrada' });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al obtener el área' });
    }
};

export const createArea = async (req, res) => {
    const { Nom_Area } = req.body;

    if (!Nom_Area) {
        logger.warn('El nombre del área es obligatorio');
        return res.status(400).json({ message: 'El nombre del área es obligatorio' });
    }

    try {
        const area = await Area.create(req.body);
        res.status(201).json({ message: 'Área creada exitosamente', area });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al crear el área' });
    }
};

export const updateArea = async (req, res) => {
    const { Nom_Area } = req.body;

    if (!Nom_Area) {
        logger.warn('El nombre del área es obligatorio');
        return res.status(400).json({ message: 'El nombre del área es obligatorio' });
    }

    try {
        const [updated] = await Area.update(req.body, {
            where: { Id_Area: req.params.id }
        });
        if (updated) {
            const updatedArea = await Area.findByPk(req.params.id);
            res.status(200).json({ message: 'Área actualizada exitosamente', updatedArea });
        } else {
            res.status(404).json({ message: 'Debe modificar al menos un campo.' });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al actualizar el área' });
    }
};

export const deleteArea = async (req, res) => {
    try {
        const deleted = await Area.destroy({
            where: { Id_Area: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: 'Área eliminada exitosamente' });
        } else {
            res.status(404).json({ message: 'Área no encontrada' });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al eliminar el área' });
    }
};

export const getQueryArea = async (req, res) => {
    try {
        const areas = await Area.findAll({
            where: {
                Nom_Area: {
                    [Sequelize.Op.like]: `%${req.params.Nom_Area}%`
                }
            }
        });
        if (areas.length > 0) {
            res.status(200).json(areas);
        } else {
            res.status(404).json({ message: "No se encontraron registros para el nombre especificado" });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

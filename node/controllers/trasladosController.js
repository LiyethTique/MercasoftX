import trasladosModel from "../models/trasladosModel.js";

// Mostrar todos los registros
export const getAllTraslados = async (req, res) => {
    try {
        const traslados = await trasladosModel.findAll();
        res.status(200).json(traslados);
    } catch (error) {
        console.log("Error en getAllTraslados:", error);
        res.status(500).json({ message: error.message });
    }
};

// Mostrar un registro
export const getTraslado = async (req, res) => {7
    try {
        const traslado = await trasladosModel.findAll({
            where: { id: req.params.id }
        });
        if (traslado.length > 0) {
            res.status(200).json(traslado[0]);
        } else {
            res.status(404).json({ message: "Registro no encontrado" });
        }
    } catch (error) {
        console.log("Error en getTraslado: ", error);
        res.status(500).json({ message: error.message });
    }
};

// Crear un registro
export const createTraslado = async (req, res) => {
    try {
        await trasladosModel.create(req.body);
        res.status(201).json({ message: "¡Registro creado exitosamente!" });
    } catch (error) {
        console.log("Error en createTraslado:", error);
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un registro
export const updateTraslado = async (req, res) => {
    try {
        const [updated] = await trasladosModel.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            res.status(200).json({ message: "¡Registro actualizado exitosamente!" });
        } else {
            res.status(404).json({ message: "Registro no encontrado" });
        }
    } catch (error) {
        console.log("Error en updateTraslado:", error);
        res.status(500).json({ message: error.message });
    }
};

// Borrar un registro
export const deleteTraslado = async (req, res) => {
    try {
        const deleted = await trasladosModel.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: "¡Registro borrado exitosamente!" });
        } else {
            res.status(404).json({ message: "Registro no encontrado" });
        }
    } catch (error) {
        console.log("Error en deleteTraslado:", error);
        res.status(500).json({ message: error.message });
    }
};

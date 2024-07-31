import { Sequelize } from "sequelize";
import proyectoModel from "../models/proyectoModel.js";

export const getAllproyecto = async (req, res) => {
    try {
        const responsables = await proyectoModel.findAll();
        res.json(responsables);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Mostrar un registro
export const getproyecto = async (req, res) => {
    try {
        const responsables = await proyectoModel.findAll({
            where: { id: req.params.id }
        });
        res.json(responsables[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un registro
export const createproyecto = async (req, res) => {
    try {
        await proyectoModel.create(req.body);
        res.json({ message: "¡Registro creado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un registro
export const updateproyecto = async (req, res) => {
    try {
        await proyectoModel.update(req.body, {
            where: { id: req.params.id }
        });
        res.json({ message: "¡Registro actualizado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Borrar un registro
export const deleteproyecto = async (req, res) => {
    try {
        await proyectoModel.destroy({
            where: { id: req.params.id }
        });
        res.json({ message: "¡Registro borrado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Obtener registros mediante consulta
export const getQueryproyecto = async (req, res) => {

    console.log(req.params.Documento)
    try {
        const responsables = await proyectoModel.findAll({
            where: {
                documento: {
                    [Sequelize.Op.like]: `%${req.params.Documento}%`
                }
            }
        })
        res.json(responsables)
    } catch (error) {
        res.json({ message: error.message })
    }
}

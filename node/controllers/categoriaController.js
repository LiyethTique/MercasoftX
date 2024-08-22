import { Sequelize } from "sequelize";
import CategoriaModel from "../models/categoriaModel.js";

// Mostrar todos los registros
export const getAllCategoria = async (req, res) => {
    try {
        const categorias = await CategoriaModel.findAll();

        res.status(200).json(categorias);
    } catch (error) {

        res.status(500).json({ message: 'Error al recuperar todas las categorías', error: error.message });
    }
}

// Mostrar un registro
export const getCategoria = async (req, res) => {
    try {
        const categoria = await CategoriaModel.findAll({
            where: { Id_Categoria: req.params.id }
        });
        if (categoria.length > 0) {

            res.status(200).json(categoria[0]);
        } else {

            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {

        res.status(500).json({ message: 'Error al recuperar la categoría', error: error.message });
    }
}

// Crear una Categoría
export const createCategoria = async (req, res) => {

    const { Nom_Categoria } = req.body;

    if (!Nom_Categoria) {
        logger.warn('El campo Nom_Categoria es obligatorio');
        return res.status(400).json({ message: 'El campo Nom_Categoria es obligatorio' });
    }

    try {
        const nuevaCategoria = await CategoriaModel.create(req.body);

        res.status(201).json({ message: '¡Registro Creado Exitosamente!', categoria: nuevaCategoria });
    } catch (error) {

        res.status(400).json({ message: 'Error al crear la categoría', error: error.message });
    }
}

// Actualizar un registro 
export const updateCategoria = async (req, res) => {

    const { Nom_Categoria } = req.body;

    if (!Nom_Categoria) {
        logger.warn('El campo Nom_Categoria es obligatorio');
        return res.status(400).json({ message: 'El campo Nom_Categoria es obligatorio' });
    }

    try {
        const [updated] = await CategoriaModel.update(req.body, {
            where: { Id_Categoria: req.params.id }
        });
        if (updated) {

            res.status(200).json({ message: '¡Registro Actualizado Exitosamente!' });
        } else {

            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {

        res.status(400).json({ message: 'Error al actualizar la categoría', error: error.message });
    }
}

// Borrar un registro
export const deleteCategoria = async (req, res) => {
    try {
        const deleted = await CategoriaModel.destroy({
            where: { Id_Categoria: req.params.id }
        });
        if (deleted) {

            res.status(200).json({ message: '¡Registro Borrado Exitosamente!' });
        } else {

            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {

        res.status(500).json({ message: 'Error al borrar la categoría', error: error.message });
    }
<<<<<<< HEAD
};
=======
}
>>>>>>> main

export const getQueryCategoria = async (req, res) => {
    try {
        const categoria = await CategoriasModel.findAll({
            where: {
                Nom_Categoria: {
                    [Sequelize.Op.like]: `%${req.params.Nom_Categoria}%`
                }
            }
        })
        if(categoria.length > 0){
            res.status(200).json(categoria)
        } else {
            res.status(404).json({ message: "No se encontraron registros para el nombre especificado" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
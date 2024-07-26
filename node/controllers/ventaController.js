
import { Sequelize } from "sequelize";
import VentaModel from "../models/ventaModel.js";
import ventaModel from "../models/ventaModel.js";

//mostrar todos los registros
export const getAllVenta = async (req,res) => {
    try {
        const venta = await ventaModel.findAll()
        res.json(venta)
    } catch (error) {
        res.json({message: error.message})
    }
}

//mostrar un registro
export const getVenta = async (req, res) => {
    try {
        const venta = await ventaModel.findAll({
            where: {id: req.params.id}
        })
        res.json(venta[0])
    } catch (error) {
        res.json({ message: error.message})
    }
}
//Crear una Venta
export const createVenta = async (req, res) => {
    try {
        await ventaModel.create(req.body)
        res.json({"message": "!Registro Creado Exitosamente¡" })

    }catch(error) {
        res.json({ message: error.message})
    }
}
//Actualizar un registro 
export const updateVenta = async (req, res) => {
    try{
        await ventaModel.update(req.body, {
            where: {id: req.params.id}
        })
        res.json({ "message": "¡Registro Actualizado Exitosamente!"})
    } catch (error) {
        res.json({ message: error.message})
    }
}

//Borrar un registro
export const deleteVenta = async (req, res) => {
    try {
    await ventaModel.destroy({
        where: {id: req.params.id}
    })
    res.json({"message": "¡Registro Borrado Exitosamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getQueryVenta = async (req, res) => {

    try {
        const venta = await VentaModel.findAll({
            where: {
                id: {
                    [Sequelize.Op.like]: `%${req.params.id}%`
                }
            }
        })
        res.json(venta)
    } catch (error) {
        res.json({message: error.message})
    }
}
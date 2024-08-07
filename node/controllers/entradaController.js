import { Sequelize, Op } from "sequelize"
import EntradasModel from "../models/entradaModel.js"

export const getAllEntradas = async (req, res) => {
    try {
        const entradas = await EntradasModel.findAll()
        if(entradas.length > 0){
            res.status(200).json(entradas)
        }
    } catch (error) {
        res.status(404).json({ message: "No se encontraron registros" })
    }
}

export const getEntrada = async (req, res) => {
    try {
        const entrada = await EntradasModel.findAll({
            where: { id: req.params.id }
        })
        if(entrada.length > 0){
            res.status(200).json(entrada[0])
        } else {
            res.status(404).json({ message: "Registro no encontrado!" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createEntrada = async (req, res) => {
    try {
        const respuesta = await EntradasModel.create(req.body)
        if (respuesta.length > 0) {
            res.status(201).json({ message: "¡Registro creado exitosamente!" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateEntrada = async (req, res) => {
    try {
        const respuesta = await EntradasModel.update(req.body, {
            where: { id: req.params.id }
        })
        if (respuesta.length > 0) {
            res.status(200).json({ message: "¡Registro actualizado exitosamente!" })
        } else {
            res.status(404).json({ message: "Registro no encontrado" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteEntrada = async (req, res) => {
    try {
        const respuesta = await EntradasModel.destroy({
            where: { id: req.params.id }
        })
        if (respuesta > 0) {
            res.status(200).json({ message: "¡Registro eliminado exitosamente!" })
        } else {
            res.status(404).json({ message: "Registro no encontrado!" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getQueryEntrada = async (req, res) => {
    try {
        const entrada = await EntradasModel.findAll({
            where: {
                Fec_Entrada: req.params.Fec_Entrada
            }
        })
        if(entrada.length > 0){
            res.status(200).json(entrada)
        } else {
            res.status(404).json({ message: "No se encontraron registros para la fecha especificada" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
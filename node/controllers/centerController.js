import { Sequelize } from "sequelize";
import CenterModel from "../models/centerModels.js";

export const getAllCenters = async (req, res) => {
    try {
        const centers = await CenterModel.findAll()
        res.json(centers) 
    } catch (error) {
        res.json({ message: error.message})

        }
    }

export const getCenter = async (req, res) => {
    try {
        const center = await CenterModel.findAll({
            where: { id: req.params.id }
        })
        res.json(center[0])
    } catch (error) {
        res.json({ message: error.message})
    }
}
export const createCenter = async (req, res) => {
    try {
        const center = await CenterModel.findAll({
            where: { id: req.params.id }
        })
        res.json(center[0])
    } catch (error) {
        res.json({ message: error.message})
    }
}
export const updateCenter = async (req, res) => {
    try {
        const center = await CenterModel.findAll({
            where: { id: req.params.id }
        })
        res.json(center[0])
    } catch (error) {
        res.json({ message: error.message})
    }
}
export const deletecenter = async (req, res) => {
    try {
        const center = await CenterModel.findAll({
            where: { id: req.params.id }
        })
        res.json(center[0])
    } catch (error) {
        res.json({ message: error.message})
    }
}
export const getQueryCenter = async (req, res) => {
    try {
        const center = await CenterModel.findAll({
            where: { id: req.params.id }
        })
        res.json(center[0])
    } catch (error) {
        res.json({ message: error.message})
    }
}


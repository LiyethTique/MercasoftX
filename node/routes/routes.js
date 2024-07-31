import express from "express";
import { createproyecto, deleteproyecto,getAllproyecto,getproyecto,updateproyecto, getQueryproyecto} from "../controllers/proyectoController.js";

const router = express.Router()

router.get('/',getAllproyecto)
router.get('/:id', getproyecto) 
router.post('/', createproyecto)
router.put('/:id', updateproyecto)
router.delete('/:id', deleteproyecto)
router.get('/Documento/:Documento', getQueryproyecto)

export default router

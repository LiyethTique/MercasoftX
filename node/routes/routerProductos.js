const express = require('express');
import { createProducto, deleteProducto, getAllProductos, getProducto, getQueryProducto, updateProducto } from "../controllers/productoController.js";

const router = express.Router()

router.get('/', getAllProductos)
router.get('/:id', getProducto)
router.post('/', upload.single('Ima_Producto'), createProducto)
router.put('/:id', upload.single('Ima_Producto'), updateProducto)
router.delete('/:id', deleteProducto)

//consultar por nom_producto
router.get('/Nom_Producto/:Nom_Producto', getQueryProducto)

export default router

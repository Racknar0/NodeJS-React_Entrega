const express = require('express');
const { Router } = express;
const router = Router();
const admin = require('../admin');

const ProductosController = require('../controller/ProductosController');

router.get('/', (req, res) => {
    try {
        const productosController = new ProductosController();
        const productos = productosController.listar();
        res.json(productos);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error al listar los productos',
        });
    }
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    try {
        const productosController = new ProductosController();
        const producto = productosController.listarPorId(id);
        res.json(...producto);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error al listar el producto',
        });
    }
});

router.post('/', (req, res) => {
    if(admin){
        try {
            const productosController = new ProductosController();
            const producto = productosController.guardar(req.body);
            res.json(producto);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: 'Error al guardar el producto',
            });
        }
    } else {
        res.status(401).json({
            error: 'No estas autorizado',
            descripcion: 'No estas autorizado para realizar esta accion ruta',
            ruta: '/productos',
            metodo: 'POST',
        });
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    if(admin){
        try {
            const productosController = new ProductosController();
            const producto = productosController.actualizar(id, req.body);
            res.json(producto);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: 'Error al actualizar el producto',
            });
        }
    }   else {
        res.status(401).json({
            error: 'No estas autorizado',
            descripcion: 'No estas autorizado para realizar esta accion ruta',
            ruta: '/productos',
            metodo: 'PUT',
        });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    if(admin){
        try {
            const productosController = new ProductosController();
            const producto = productosController.borrar(id);
            res.json(producto);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: 'Error al borrar el producto',
            });
        }
    } else {
        res.status(401).json({
            error: 'No estas autorizado',
            descripcion: 'No estas autorizado para realizar esta accion ruta',
            ruta: '/productos',
            metodo: 'DELETE',
        });
    }
});

module.exports = router;

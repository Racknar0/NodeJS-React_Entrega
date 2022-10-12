const express = require('express');
const { Router } = express;
const router = Router();

const CarritoController = require('../controller/CarritoController');
const admin = require('../admin');

/* get '/:id/productos' Me permite listar todos los prodcutos guardados en el carrito*/
router.get('/:id/productos', (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const carritoController = new CarritoController();
        const productos = carritoController.listarProductos(id);
        res.json(productos);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error al listar los productos',
        });
    }
});

/* post '/' crea un carrito y devuelve su id */
router.post('/', (req, res) => {
    const carrito = req.body;
    try {
        const carritoController = new CarritoController();
        const id = carritoController.guardar(carrito);
        res.json({ id });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error al guardar el carrito',
        });
    }
});

/* delete '/:id' elimina el carrito*/
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    try {
        const carritoController = new CarritoController();
        const carrito = carritoController.eliminarCarrito(id);
        res.json(carrito);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error al eliminar el carrito',
        });
    }
});

/* post /:id/productos incorpora productos al carrito */
router.post('/:id/productos', (req, res) => {
    const { id } = req.params;
    const producto = req.body;
    try {
        const carritoController = new CarritoController();
        const carrito = carritoController.agregarProducto(id, producto);
        res.json(carrito);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error al agregar el producto al carrito',
        });
    }
});

/* delete '/:id/productos/:id_prod' elimina un producto del carrito*/
router.delete('/:id/productos/:id_prod', (req, res) => {
    const { id, id_prod } = req.params;
    try {
        const carritoController = new CarritoController();
        const carrito = carritoController.eliminarProducto(id, id_prod);
        res.json(carrito);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error al eliminar el producto del carrito',
        });
    }
});

module.exports = router;

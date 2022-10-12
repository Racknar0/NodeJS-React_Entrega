const fs = require('fs');
const path = require('path');
const carritoData = require('../model/carritoData.json');

class CarritoController {
    constructor() {
        this.carritos = carritoData;
    }

    //! Listar productos de un carrito
    listarProductos(id) {
        let productos;
        this.carritos.forEach((carrito) => {
            if (carrito.id == id) {
                productos = carrito.productos;
            }
        });
        return productos;
    }

    //! Crear un carrito
    crearCarrito(carritoData) {
        carritoData.id = 1;
        carritoData.timestamp = new Date().toLocaleString();

        const carrito = {
            id: this.carritos.length + 1,
            timestamp: new Date().toLocaleString(),
            /* agregar id y timestamp */
            productos: [
                {
                    id: 1,
                    timestamp: new Date().toLocaleString(),
                    ...carritoData,
                },
            ],
        };

        this.carritos.push(carrito);
        fs.writeFileSync(
            path.join(__dirname, '../model/carritoData.json'),
            JSON.stringify(this.carritos, null, '\t')
        );
        return carrito.id;
    }

    //! Eliminar un carrito
    eliminarCarrito(id) {
        this.carritos = this.carritos.filter((carrito) => carrito.id != id);
        fs.writeFileSync(
            path.join(__dirname, '../model/carritoData.json'),
            JSON.stringify(this.carritos, null, '\t')
        );

        return this.carritos;
    }

    //! Agregar un producto a un carrito
    agregarProducto(id, producto) {
        const { nombre, descripcion, codigo, foto, precio, stock } = producto;

        this.carritos.forEach((carrito) => {
            if (carrito.id == id) {
                carrito.productos.push({
                    id: carrito.productos.length + 1,
                    timestamp: new Date().toLocaleString(),
                    nombre,
                    descripcion,
                    codigo,
                    foto,
                    precio,
                    stock,
                });

                fs.writeFileSync(
                    path.join(__dirname, '../model/carritoData.json'),
                    JSON.stringify(this.carritos, null, '\t')
                );
            } else {
                return 'No existe el carrito';
            }
        });
        return this.carritos;
    }

    //! Eliminar un producto de un carrito
    eliminarProducto(id, idProducto) {
        this.carritos.forEach((carrito) => {
            if (carrito.id == id) {
                carrito.productos = carrito.productos.filter(
                    (producto) => producto.id != idProducto
                );
            }
        });

        fs.writeFileSync(
            path.join(__dirname, '../model/carritoData.json'),
            JSON.stringify(this.carritos, null, '\t')
        );

        return this.carritos;
    }
}

module.exports = CarritoController;

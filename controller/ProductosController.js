const fs = require('fs');
const path = require('path');
const productosData = require('../model/productosData.json');

class ProductosController {
    constructor() {
        this.productos = productosData;
    }

    //! Listar todos los productos
    listar() {
        return this.productos;
    }

    //! Listar un producto por ID
    listarPorId(id) {
        return this.productos.filter((producto) => producto.id == id);
    }

    //! Agrergar un producto
    guardar(producto) {
        const prod = {
            id: this.productos.length + 1,
            timestamp: new Date().toLocaleString(),
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            codigo: producto.codigo,
            foto: producto.foto,
            precio: producto.precio,
            stock: producto.stock,
        };

        this.productos.push(prod);
        fs.writeFileSync(
            path.join(__dirname, '../model/productosData.json'),
            JSON.stringify(this.productos, null, '\t')
        );

        return this.productos;
    }

    //! Actualizar un producto
    actualizar(id, prod) {
        this.productos.filter(producto => {
            if (producto.id == id) {
                producto.nombre = prod.nombre;
                producto.descripcion = prod.descripcion;
                producto.codigo = prod.codigo;
                producto.foto = prod.foto;
                producto.precio = prod.precio;
                producto.stock = prod.stock;
            }
        });

        fs.writeFileSync(
            path.join(__dirname, '../model/productosData.json'),
            JSON.stringify(this.productos, null, '\t')
        );

        return this.productos;
    }

    //! Borrar un producto
    borrar(id) {
        this.productos = this.productos.filter((producto) => producto.id != id);

        fs.writeFileSync(
            path.join(__dirname, '../model/productosData.json'),
            JSON.stringify(this.productos, null, '\t')
        );

        return this.productos;
    }
}

module.exports = ProductosController;

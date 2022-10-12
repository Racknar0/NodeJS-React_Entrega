const express = require('express');
const path = require('path');
const app = express();
var bodyParser = require('body-parser')
const cors = require('cors')

const ProductosRouter = require('./router/ProductosRouter');
const CarritoRouter = require('./router/CarritoRouter');


//! Middleware de terceros
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public'))) //! aca se declaran los archivos estaticos

const PORT = process.env.PORT || 3000;



app.use('/api/productos', ProductosRouter);
app.use('/api/carrito', CarritoRouter);




//! Middleware de manejo de errores
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


//! Conexion al servidor
const server = app.listen(PORT, () => {
    console.log(
        `Servidor http esta escuchando en el puerto ${server.address().port}`
    );
});



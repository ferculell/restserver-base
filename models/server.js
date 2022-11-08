const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.rutaAuth = '/api/auth';
        this.rutaBuscar = '/api/buscar';
        this.rutaCategorias = '/api/categorias';
        this.rutaProductos = '/api/productos';
        this.rutaUploads = '/api/uploads';
        this.rutaUsuarios = '/api/usuarios';

        // Conectar base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo de json
        this.app.use( express.json() );

        // Directorios públicos
        this.app.use( express.static('public') );

        // Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    routes() {

        this.app.use( this.rutaAuth, require('../routes/auth') );
        this.app.use( this.rutaBuscar, require('../routes/buscar') );
        this.app.use( this.rutaCategorias, require('../routes/categorias') );
        this.app.use( this.rutaProductos, require('../routes/productos') );
        this.app.use( this.rutaUploads, require('../routes/uploads') );
        this.app.use( this.rutaUsuarios, require('../routes/usuarios') );

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        })
    }
}

module.exports = Server;
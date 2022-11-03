const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
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
    }

    routes() {

        this.app.use( this.rutaUsuarios, require('../routes/usuarios') );

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        })
    }
}

module.exports = Server;
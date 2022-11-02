const express = require('express');
const cors = require('cors');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Directorios públicos
        this.app.use( express.static('public') )
    }

    routes() {

        this.app.use('/api/usuarios', require('../routes/user'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        })
    }
}

module.exports = Server;
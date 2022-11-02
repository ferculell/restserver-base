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

        this.app.get('/api', (req, res) => {
            res.json({message: 'Hello GET!'});
        })

        this.app.post('/api', (req, res) => {
            res.status(201).json({message: 'Hello POST!'});
        })

        this.app.put('/api', (req, res) => {
            res.json({message: 'Hello PUT!'});
        })

        this.app.delete('/api', (req, res) => {
            res.json({message: 'Hello DELETE!'});
        })

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        })
    }
}

module.exports = Server;
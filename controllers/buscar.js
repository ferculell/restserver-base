const { response } = require("express");
const { Usuario, Categoria, Producto } = require("../models");
const { ObjectId } = require("mongoose").Types;


const coleccionesExistentes = [
    'categorias',
    'productos',
    'roles',
    'usuarios'
];

const buscarCategoria = async(termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {

        const categoria = await Categoria.findById(termino);
        return res.json({
            results: categoria ? [categoria] : []
        });

    } else {
        
        const regexp = new RegExp(termino, 'i');
        
        const categoria = await Categoria.find({nombre: regexp, estado: true});
        return res.json({
            results: categoria ? [categoria] : []
        });  

    }

}

const buscarProducto = async(termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {

        const producto = await Producto.findById(termino).populate('categoria');
        return res.json({
            results: producto ? [producto] : []
        });

    } else {
        
        const regexp = new RegExp(termino, 'i');
        
        const producto = await Producto.find({nombre: regexp, estado: true}).populate('categoria');
        return res.json({
            results: producto ? [producto] : []
        });
        
    }

}

const buscarUsuario = async(termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {

        const usuario = await Usuario.findById(termino);
        return res.json({
            results: usuario ? [usuario] : []
        });

    } else {
        
        const regexp = new RegExp(termino, 'i');
        
        const usuario = await Usuario.find({
            $or: [{nombre: regexp}, {correo: regexp}],
            $and: [{estado: true}]
        });

        return res.json({
            results: usuario ? [usuario] : []
        });

    }

}

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesExistentes.includes(coleccion)) {
        return res.status(400).json({
            msg:`La colección ${coleccion} no existe en la base de datos. Las colecciones existentes son: ${coleccionesExistentes}`
        });
    }

    switch (coleccion) {
        case 'categorias':
            buscarCategoria(termino, res);
            break;

        case 'productos':
            buscarProducto(termino, res);
            break;

        case 'roles':
    
            break;

        case 'usuarios':
            buscarUsuario(termino, res);
            break;
    
        default:
            res.status(500).json({
                msg: 'Búsqueda no manejada por el servidor.'
            });
            break;
    }

}

module.exports = {
    buscar
}
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const getUsuarios = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = {estado: true};


    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
                    .skip(Number(desde))
                    .limit(Number(limite))
    ]);

    res.json({ total, usuarios });
}

const postUsuarios = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    // Guardar en base de datos
    await usuario.save();

    res.status(201).json({usuario});
}

const putUsuarios = async(req, res) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...datos } = req.body;

    if (password) {
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        datos.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, datos);

    res.status(201).json({usuario});
}

const deleteUsuarios = (req, res) => {
    res.json({message: 'Hello DELETE!', from: 'Controller'});
}

module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios
}
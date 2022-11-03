const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const getUsuarios = (req = request, res = response) => {

    const { q, nombre = 'No Name', key } = req.query;

    res.json({message: 'Hello GET!', from: 'Controller', q, nombre, key});
}

const postUsuarios = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Verificar si el correo ya existe

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    // Guardar en base de datos
    await usuario.save();

    res.status(201).json({usuario});
}

const putUsuarios = (req, res) => {

    const { id } = req.params;

    res.json({message: 'Hello PUT!', from: 'Controller', id});
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
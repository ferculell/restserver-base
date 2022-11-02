const { response, request } = require('express');


const getUsuarios = (req = request, res = response) => {

    const { q, nombre = 'No Name', key } = req.query;

    res.json({message: 'Hello GET!', from: 'Controller', q, nombre, key});
}

const postUsuarios = (req, res = response) => {

    const { user, role } = req.body;

    res.status(201).json({message: 'Hello POST!', from: 'Controller', user, role});
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
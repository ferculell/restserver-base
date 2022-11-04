const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No existe un token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETKEY);
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido. Usuario no existente.'
            });
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido. Usuario inactivo.'
            });
        }

        req.usuario = usuario;
        next();

    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }

}

module.exports = {
    validarJWT
}
const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");



const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {
        
        // Verifica que el usuario exista y está
        const usuario = await Usuario.findOne({correo});
        if (!usuario || !usuario.estado) {
            return res.status(400).json({
                msg: 'Correo o contraseña no válidos'
            });
        }
        
        // Verifica que la contraseña sea la correcta
        const passValido = bcryptjs.compareSync(password, usuario.password);
        if (!passValido) {
            return res.status(400).json({
                msg: 'Correo o contraseña no válidos'
            });
        }

        // Genera el token (JWT)
        const token = await generarJWT(usuario.id);
    
        res.json({
            usuario,
            token
        });

    } catch (error) {
        
        console.error(error);
        res.status(500).json({
            msg: 'Comuníquese con el administrador de la API'
        });

    }
}

module.exports = {
    login
}
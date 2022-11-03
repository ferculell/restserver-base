const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

// Verificar si el correo ya existe
const existeCorreo = async(correo = '') => {
    const existeCorreo = await Usuario.findOne({correo});
    if (existeCorreo) {
        throw new Error('El correo proporcionado ya existe en la base de datos. Utilice otro correo.');
    }
}

module.exports = {
    esRoleValido,
    existeCorreo,
}
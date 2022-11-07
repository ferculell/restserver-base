const { Categoria, Usuario, Role } = require('../models');


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

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${id} no corresponde a un usuario registrado.`);
    }
}

const existeCategoriaPorId = async(id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id ${id} no corresponde a una categoría registrada.`);
    }
}

module.exports = {
    esRoleValido,
    existeCorreo,
    existeUsuarioPorId,
    existeCategoriaPorId
}
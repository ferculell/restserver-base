const { response } = require("express")



const esAdmin = (req, res = response, next) => {
    
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se está intentando validar el rol sin verificar el token antes.'
        });
    }
    
    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `El usuario ${nombre} no tiene rol de Administrador - No puede realizar esta acción`
        });
    }

    next();
}

const tieneRol = (...roles) => {

    return (req, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se está intentando validar el rol sin verificar el token antes.'
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El usuario ${req.usuario.nombre} no tiene ninguno de estos roles: ${roles} - No puede realizar esta acción`
            });
        }

        next();
    }
}

module.exports = {
    esAdmin,
    tieneRol
}
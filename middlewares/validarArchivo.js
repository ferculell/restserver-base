const validarArchivo = (req, res, next) => {

    if (!req.files || !req.files.archivo) {
        return res.status(400).json({
            msg: 'No hay archivo para cargar'
        });
    }

    next();
}

module.exports = {
    validarArchivo
}
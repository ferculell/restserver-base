const path = require('path');


const cargarArchivo = (req, res) => {

    if (!req.files || !req.files.archivo) {
        res.status(400).json({
            msg: 'No hay archivo para cargar'
        });
        return;
    }

    const { archivo } = req.files;

    const uploadPath = path.join(__dirname, "../uploads/", archivo.name);

    archivo.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({err});
        }

        res.json({
            msg: `Archivo subido a ${uploadPath}`
        });
    });
};

module.exports = {
    cargarArchivo,
};

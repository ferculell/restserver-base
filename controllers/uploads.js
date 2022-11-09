const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { subirArchivo } = require("../helpers/subirArchivo");
const { Usuario, Producto } = require("../models");



const cargarArchivo = async(req, res) => {

    try {
        
        const [nombre, pathCompleto] = await subirArchivo(req.files.archivo);
    
        res.json({
            msg: `El archivo fue guardado en la ruta ${pathCompleto}`
        });
        
    } catch (error) {
        res.status(400).json({
            msg: error
        });
    }

};

const actualizarArchivo = async(req, res) => {

    const { id, coleccion } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
    
        default:
            res.status(500).json({
                msg: `Petición no manejada para la colección ${coleccion}`
            });
            break;
    }

    // Limpiar imagen previa
    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }

    const [nombre, pathCompleto] = await await subirArchivo(req.files.archivo, undefined, coleccion);
    modelo.img = nombre; 

    await modelo.save();

    res.json(modelo);
}

const actualizarArchivoCloudinary = async(req, res) => {

    const { id, coleccion } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
    
        default:
            res.status(500).json({
                msg: `Petición no manejada para la colección ${coleccion}`
            });
            break;
    }

    // Limpiar imagen previa
    if (modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [imgId, extension] = nombre.split('.');
        cloudinary.uploader.destroy(imgId);
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    modelo.img = secure_url;

    await modelo.save();

    res.json(modelo);
}

const mostrarImagen = async(req, res) => {

    const { id, coleccion } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
    
        default:
            res.status(500).json({
                msg: `Petición de imagen no manejada para la colección ${coleccion}`
            });
            break;
    }

    // Mostrar imagen
    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }

    const pathSinImagen = path.join(__dirname, '../assets/No-Image-Placeholder.png');
    res.sendFile(pathSinImagen);
}

const mostrarImagenCloudinary = async(req, res) => {

    const { id, coleccion } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
    
        default:
            res.status(500).json({
                msg: `Petición de imagen no manejada para la colección ${coleccion}`
            });
            break;
    }

    // Mostrar imagen
    if (modelo.img) {
        return res.redirect(modelo.img);
    }

    const pathSinImagen = path.join(__dirname, '../assets/No-Image-Placeholder.png');
    res.sendFile(pathSinImagen);
}

module.exports = {
    cargarArchivo,
    actualizarArchivo,
    actualizarArchivoCloudinary,
    mostrarImagen,
    mostrarImagenCloudinary
};

const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarArchivo, mostrarImagen, actualizarArchivoCloudinary, mostrarImagenCloudinary } = require('../controllers/uploads');
const { esColeccionPermitida } = require('../helpers/dbValidators');
const { validarCampos, validarArchivo } = require('../middlewares');


const router = Router();

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser un id válido para MongoDB').isMongoId(),
    check('coleccion').custom(coleccion => esColeccionPermitida(coleccion, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagenCloudinary); // Para mostrar imágenes del propio servidor: mostrarImagen

router.post('/', [validarArchivo], cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivo,
    check('id', 'El id debe ser un id válido para MongoDB').isMongoId(),
    check('coleccion').custom(coleccion => esColeccionPermitida(coleccion, ['usuarios', 'productos'])),
    validarCampos
], actualizarArchivoCloudinary); // Para guardar en el propio servidor: actualizarArchivo

module.exports = router;
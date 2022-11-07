const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeProductoPorId } = require('../helpers/dbValidators');

const {
    validarCampos,
    validarJWT,
    esAdmin,
    tieneRol
} = require('../middlewares');


const router = Router();


// Obtener todos los productos - Acceso público
router.get('/', obtenerProductos);

// Obtener un producto por ID - Acceso público
router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto);

// Crear producto - Acceso privado para cualquier rol
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearProducto)

// Actualizar producto - Acceso privado para cualquier rol
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto)

// Borrar producto - Acceso privado para ADMIN_ROLE
router.delete('/:id', [
    validarJWT,
    esAdmin,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto)

module.exports = router;
const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/dbValidators');

const {
    validarCampos,
    validarJWT,
    esAdmin,
    tieneRol
} = require('../middlewares');


const router = Router();


// Obtener todas las categorías - Acceso público
router.get('/', obtenerCategorias);

// Obtener una categoría por ID - Acceso público
router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria);

// Crear categoría - Acceso privado para cualquier rol
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

// Actualizar categoría - Acceso privado para cualquier rol
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria)

// Borrar categoría - Acceso privado para ADMIN_ROLE
router.delete('/:id', [
    validarJWT,
    esAdmin,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria)

module.exports = router;
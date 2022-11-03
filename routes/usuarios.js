const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } = require('../controllers/usuarios');
const { esRoleValido, existeCorreo, existeUsuarioPorId } = require('../helpers/dbValidators');
const { validarCampos } = require('../middlewares/validarCampos');


const router = Router();

router.get('/', getUsuarios);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener al menos 6 caracteres').isLength({min: 6}),
    check('correo', 'El correo no tiene un formato válido').isEmail(),
    check('correo').custom(existeCorreo),
    //check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido), // Esta línea es igual a: check('rol').custom(rol => esRoleValido(rol)),
    validarCampos
], postUsuarios);

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], putUsuarios);

router.delete('/', deleteUsuarios);

module.exports = router;
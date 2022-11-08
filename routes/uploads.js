const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo } = require('../controllers/uploads');
const { validarCampos } = require('../middlewares/validarCampos');


const router = Router();

router.post('/', cargarArchivo);

module.exports = router;
const { response, request } = require("express");
const { Categoria } = require("../models");


const obtenerCategorias = async(req = request, res = response) => {

    const { limite = 5, desde = 0} = req.query;
    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        await Categoria.countDocuments(query),
        await Categoria.find(query)
                       .skip(Number(desde))
                       .limit(Number(limite))
                       .populate('usuario', 'nombre')
    ]);

    res.json({ total, categorias });
}

const obtenerCategoria = async(req = request, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json({categoria});

}

const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    // Validar que la categoría no existe
    const categoriaDB = await Categoria.findOne({ nombre });
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoría ${categoriaDB.nombre} ya existe`
        });
    }

    // Guardar nueva categoría
    const data = {
        nombre,
        usuario: req.usuario._id
    };

    const categoria = new Categoria(data);

    await categoria.save();

    res.status(201).json(categoria);
}

const actualizarCategoria = async(req = request, res = response) => {

    const { id } = req.params;
    const { nombre } = req.body;
    const { usuario } = req.usuario; // Usuario autenticado

    const categoria = await Categoria.findByIdAndUpdate(id, {nombre: nombre.toUpperCase(), usuario});

    res.status(201).json({categoria});
}

// borrarCategoria - estado: false
const borrarCategoria = async(req, res) => {

    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false});

    res.json(categoria);
}

module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    crearCategoria,
    borrarCategoria
}
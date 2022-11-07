const { response, request } = require("express");
const { Producto, Categoria } = require("../models");


const obtenerProductos = async(req = request, res = response) => {

    const { limite = 5, desde = 0} = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        await Producto.countDocuments(query),
        await Producto.find(query)
                       .skip(Number(desde))
                       .limit(Number(limite))
                       .populate('usuario', 'nombre')
    ]);

    res.json({ total, productos });
}

const obtenerProducto = async(req = request, res = response) => {

    const { id } = req.params;

    const producto = await Producto.findById(id).populate('usuario', 'nombre');

    res.json({producto});

}

const crearProducto = async(req, res = response) => {

    const categoria = req.body.categoria.toUpperCase();
    const descripcion = req.body.descripcion;
    const nombre = req.body.nombre.toUpperCase();
    const precio = req.body.precio;

    // Validar que el producto no existe
    const productoDB = await Producto.findOne({ nombre });
    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        });
    }

    // Validar que la categoría existe
    const categoriaDB = await Categoria.findOne({ nombre: categoria });
    if (!categoriaDB) {
        return res.status(400).json({
            msg: `La categoría ${categoria} no existe`
        });
    }

    // Guardar nueva categoría
    const data = {
        categoria: categoriaDB._id,
        descripcion,
        nombre,
        precio,
        usuario: req.usuario._id,
    };

    const producto = new Producto(data);

    await producto.save();

    res.status(201).json(producto);
}

const actualizarProducto = async(req = request, res = response) => {

    const { id } = req.params;
    const { nombre, categoria, descripcion, precio } = req.body;
    const { usuario } = req.usuario; // Usuario autenticado

    // Validar que la categoría existe
    const categoriaDB = await Categoria.findOne({ nombre: categoria.toUpperCase() });
    if (!categoriaDB) {
        return res.status(400).json({
            msg: `La categoría ${categoria} no existe`
        });
    }

    const data = {
        categoria: categoriaDB._id,
        descripcion,
        nombre: nombre.toUpperCase(),
        precio,
        usuario
    };

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});

    res.status(201).json({producto});
}

const borrarProducto = async(req, res) => {

    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate(id, {estado: false});

    res.json(producto);
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    crearProducto,
    borrarProducto
}
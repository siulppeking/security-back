const Perfil = require("../models/Perfil");

const crearPerfil = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        const existe = await Perfil.findOne({ nombre });
        if (existe) {
            return res.status(400).json({ type: 'validation', message: 'El perfil ya existe' });
        }

        const nuevoPerfil = new Perfil({ nombre, descripcion });
        const perfilGuardado = await nuevoPerfil.save();

        res.status(201).json({ type: 'success', message: 'Perfil creado', data: perfilGuardado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ type: 'exception', message: 'Error al crear perfil' });
    }
};

const listarPerfiles = async (req, res) => {
    try {
        const perfiles = await Perfil.find();
        res.json({ type: 'success', data: perfiles });
    } catch (error) {
        res.status(500).json({ type: 'exception', message: 'Error al listar perfiles' });
    }
};

const obtenerPerfilPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const perfil = await Perfil.findById(id);

        if (!perfil) {
            return res.status(404).json({
                type: 'not_found',
                message: 'Perfil no encontrado'
            });
        }

        res.json({
            type: 'success',
            data: perfil
        });
    } catch (error) {
        res.status(500).json({
            type: 'exception',
            message: 'Error al obtener el perfil'
        });
    }
};


const actualizarPerfil = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, estado } = req.body;

        const perfil = await Perfil.findByIdAndUpdate(
            id,
            { nombre, descripcion, estado },
            { new: true }
        );

        if (!perfil) {
            return res.status(404).json({ type: 'not_found', message: 'Perfil no encontrado' });
        }

        res.json({ type: 'success', message: 'Perfil actualizado', data: perfil });
    } catch (error) {
        res.status(500).json({ type: 'exception', message: 'Error al actualizar perfil' });
    }
};

const eliminarPerfil = async (req, res) => {
    try {
        const { id } = req.params;
        const perfil = await Perfil.findByIdAndDelete(id);

        if (!perfil) {
            return res.status(404).json({ type: 'not_found', message: 'Perfil no encontrado' });
        }

        res.json({ type: 'success', message: 'Perfil eliminado' });
    } catch (error) {
        res.status(500).json({ type: 'exception', message: 'Error al eliminar perfil' });
    }
};

module.exports = {
    crearPerfil,
    listarPerfiles,
    obtenerPerfilPorId,
    actualizarPerfil,
    eliminarPerfil
};

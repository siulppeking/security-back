const Empresa = require("../models/Empresa");

const crearEmpresa = async (req, res) => {
    try {
        const { ruc, razonSocial, direccion, telefono } = req.body;

        const existe = await Empresa.findOne({ ruc });
        if (existe) {
            return res.status(400).json({ type: 'validation', message: 'La empresa ya existe' });
        }

        const nueva = new Empresa({ ruc, razonSocial, direccion, telefono });
        const guardada = await nueva.save();

        res.status(201).json({ type: 'success', message: 'Empresa registrada', data: guardada });
    } catch (error) {
        res.status(500).json({ type: 'exception', message: 'Error al crear empresa' });
    }
};

const listarEmpresas = async (req, res) => {
    try {
        const empresas = await Empresa.find();
        res.json({ type: 'success', data: empresas });
    } catch (error) {
        res.status(500).json({ type: 'exception', message: 'Error al listar empresas' });
    }
};

const obtenerEmpresaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const empresa = await Empresa.findById(id);

        if (!empresa) {
            return res.status(404).json({ type: 'not_found', message: 'Empresa no encontrada' });
        }

        res.json({ type: 'success', data: empresa });
    } catch (error) {
        res.status(500).json({ type: 'exception', message: 'Error al buscar empresa' });
    }
};

const actualizarEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        const { ruc, razonSocial, direccion, telefono, estado } = req.body;

        const actualizada = await Empresa.findByIdAndUpdate(
            id,
            { ruc, razonSocial, direccion, telefono, estado },
            { new: true }
        );

        if (!actualizada) {
            return res.status(404).json({ type: 'not_found', message: 'Empresa no encontrada' });
        }

        res.json({ type: 'success', message: 'Empresa actualizada', data: actualizada });
    } catch (error) {
        res.status(500).json({ type: 'exception', message: 'Error al actualizar empresa' });
    }
};

const eliminarEmpresa = async (req, res) => {
    try {
        const { id } = req.params;

        const eliminada = await Empresa.findByIdAndDelete(id);
        if (!eliminada) {
            return res.status(404).json({ type: 'not_found', message: 'Empresa no encontrada' });
        }

        res.json({ type: 'success', message: 'Empresa eliminada' });
    } catch (error) {
        res.status(500).json({ type: 'exception', message: 'Error al eliminar empresa' });
    }
};

module.exports = {
    crearEmpresa,
    listarEmpresas,
    obtenerEmpresaPorId,
    actualizarEmpresa,
    eliminarEmpresa
};

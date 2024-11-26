const cursos = require("../modelos/cursos");
const modelos = require("../modelos");

const getAllCursos = function (req, res) {
    let registros = modelos.cursos.findAll();
    res.status(200).json(registros);

};


const deleteCursos=  function (req, res) {
    const id = parseInt(req.params.id);
    let resultado = modelos.cursos.erase(id);  
    if (resultado) {
        res.status(200).json({ msg: `id: ${id} deleted successfully` });
    } else {
        res.status(500).json({ error: `Could not delete id: ${id}` });
    }
};


const createCursos =  function (req, res) {
    const nuevoCurso = {
    id: req.body.id,
    nombre: req.body.nombre,
    claveMateria: req.body.claveMateria,
    grupo: req.body.grupo,
    profesorId: req.body.profesorId,
    };
    
    let resultado = modelos.cursos.add(nuevoCurso);  
    res.status(201).json(resultado);
};


const updateCursos = function (req, res) {
    const id = parseInt(req.params.id);
    const nuevosDatos = {
        id: req.body.id,
        nombre: req.body.nombre,
        claveMateria: req.body.claveMateria,
        grupo: req.body.grupo,
        };

    let registro = modelos.cursos.update(id, nuevosDatos);
    
    if (registro) {
        res.status(200).json(registro);  
    } else {
        res.status(404).json({
            type: "error",
            msg: "Id no encontrado"
        });
    }
}



const getCursos=  function (req, res) {
    const id = parseInt(req.params.id);
    let registro = modelos.cursos.findById(id);  
    if (registro) {
        res.status(200).json(registro);
    } else {
        res.status(404).json({ error: 'Id no encontrado' });
    }
};


exports.getAllCursos = getAllCursos;
exports.getCursos = getCursos;
exports.createCursos = createCursos;
exports.updateCursos = updateCursos;
exports.deleteCursos= deleteCursos;
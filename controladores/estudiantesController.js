const estudiantes = require("../modelos/estudiantes");
const modelos = require("../modelos");

// Metodo GET - regresa todos los registros
const getAllEstudiantes = function (req, res) {
    let registros = modelos.estudiantes.findAll();
    res.status(200).json(registros);

};

// borra un registro
const deleteEstudiante =  function (req, res) {
    const id = parseInt(req.params.id);
    let resultado = modelos.estudiantes.erase(id);  
    if (resultado) {
        res.status(200).json({ msg: `id: ${id} Estudiante borrado correctamente` });
    } else {
        res.status(500).json({ error: `No se pudo borrar id: ${id}` });
    }
};

// crea un registro
const createEstudiante =  function (req, res) {
    const nuevoEstudiante = {
        id: req.body.id, 
        nombre: req.body.nombre,
        matricula: req.body.matricula,
        semestreIngreso: req.body.semestreIngreso,
        creditosCursados: req.body.creditosCursados,
        cursosInscritos: []
    };
    
    let resultado = modelos.estudiantes.add(nuevoEstudiante);  
    res.status(201).json(resultado);
};

// modificar un registro 
const updateEstudiante = function (req, res) {
    const id = parseInt(req.params.id);
    const nuevosDatos = {
        nombre: req.body.nombre,
        matricula: req.body.matricula,
        semestreIngreso: req.body.semestreIngreso,
        creditosCursados: req.body.creditosCursados
    };

    let registro = modelos.estudiantes.update(id, nuevosDatos);
    
    if (registro) {
        res.status(200).json(registro);  
    } else {
        res.status(404).json({
            type: "error",
            msg: "Id no encontrado"
        });
    }
};


// regresar un registro especifico
const getEstudiante =  function (req, res) {
    const id = parseInt(req.params.id);
    let registro = modelos.estudiantes.findById(id);  
    if (registro) {
        res.status(200).json(registro);
    } else {
        res.status(404).json({ error: 'Id no encontrado' });
    }
};
 
const enrollEstudiante = function (req, res) {
    const estudianteId = parseInt(req.params.id);
    const cursoId = parseInt(req.body.cursoId);

    let estudiante = modelos.estudiantes.findById(estudianteId);
    
    if (!estudiante) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    let curso = modelos.cursos.findById(cursoId);
    
    if (!curso) {
        return res.status(404).json({ error: 'Curso no encontrado' });
    }

    if (!estudiante.cursosInscritos.includes(cursoId)) {
        estudiante.cursosInscritos.push(cursoId);  
        modelos.estudiantes.update(estudianteId, estudiante); 
    }

    res.status(200).json({
        msg: 'Estudiante inscrito exitosamente',
        cursosInscritos: estudiante.cursosInscritos  
    });
};

// Metodo para desinscribir a un estudiante de un curso
const disenrollEstudiante = function (req, res) {
    const estudianteId = parseInt(req.params.id);
    const cursoId = parseInt(req.body.cursoId);

    let estudiante = modelos.estudiantes.findById(estudianteId);

    if (!estudiante) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    let curso = modelos.cursos.findById(cursoId);
    
    if (!curso) {
        return res.status(404).json({ error: 'Curso no encontrado' });
    }

    estudiante.cursosInscritos = estudiante.cursosInscritos.filter(id => id !== cursoId);  

    modelos.estudiantes.update(estudianteId, estudiante); 

    res.status(200).json({
        msg: 'Estudiante desinscrito exitosamente',
        cursosInscritos: estudiante.cursosInscritos  
    });
};

// Metodo para regresar todos los cursos a los que est'a inscrito un alumnos

const cursosInscritosEstudiantes = function (req, res){

    const estudianteId = parseInt(req.params.id);

    let estudiante = modelos.estudiantes.findById(estudianteId);
    
    if (!estudiante) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    const cursosInscritosIds = estudiante.cursosInscritos;

    const cursosInfo = cursosInscritosIds.map(cursoId => modelos.cursos.findById(cursoId)).filter(curso => curso !== undefined);

    res.status(200).json({
        cursos: cursosInfo
    });

}

// Metodo para regresar todos los profesores de un alumno

const getProfesoresEstudiantes = function (req, res) {
    const estudianteId = parseInt(req.params.id);

    let estudiante = modelos.estudiantes.findById(estudianteId);
    
    if (!estudiante) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    const cursosInscritosIds = estudiante.cursosInscritos;

    const profesoresInfo = cursosInscritosIds.map(cursoId => {
        let curso = modelos.cursos.findById(cursoId);
        return curso ? modelos.profesores.findById(curso.profesorId) : undefined; 
    }).filter(profesor => profesor !== undefined);

    res.status(200).json({
        profesores: profesoresInfo
    });
};



exports.getAllEstudiantes = getAllEstudiantes;
exports.getEstudiante = getEstudiante;
exports.createEstudiante = createEstudiante;
exports.updateEstudiante = updateEstudiante;
exports.deleteEstudiante = deleteEstudiante;
exports.enrollEstudiante = enrollEstudiante;
exports.disenrollEstudiante = disenrollEstudiante;
exports.cursosInscritosEstudiantes = cursosInscritosEstudiantes;
exports.getProfesoresEstudiantes = getProfesoresEstudiantes;
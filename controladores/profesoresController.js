const estudiantes = require("../modelos/profesores");
const modelos = require("../modelos");

const getAllProfesores = function (req, res) {
    let registros = modelos.profesores.findAll();
    res.status(200).json(registros);

};


const deleteProfesores =  function (req, res) {
    const id = parseInt(req.params.id);
    let resultado = modelos.profesores.erase(id);  
    if (resultado) {
        res.status(200).json({ msg: `id: ${id} deleted successfully` });
    } else {
        res.status(500).json({ error: `Could not delete id: ${id}` });
    }
};


const createProfesores =  function (req, res) {
    const nuevoProfesores = {
        id: req.body.id,
        nombre: req.body.nombre,
        noEmpleado: req.body.noEmpleado,
        cursosInscritos: [],
        estudiantesInscritos: []
    };
    
    let resultado = modelos.profesores.add(nuevoProfesores);  
    res.status(201).json(resultado);
};


const updateProfesores = function (req, res) {
    const id = parseInt(req.params.id);
    const nuevosDatos = {
        nombre: req.body.nombre,
        noEmpleado: req.body.noEmpleado,
    };

    let registro = modelos.profesores.update(id, nuevosDatos);

    if (registro) {
        res.status(200).json(registro);  // Devuelve el registro actualizado
    } else {
        res.status(404).json({
            type: "error",
            msg: "Id no encontrado"
        });
    }
};



const getProfesores =  function (req, res) {
    const id = parseInt(req.params.id);
    let registro = modelos.profesores.findById(id);  
    if (registro) {
        res.status(200).json(registro);
    } else {
        res.status(404).json({ error: 'Id no encontrado' });
    }
};

const enrollProfesores = function (req, res) {
    const profesoresId = parseInt(req.params.id);  
    const cursoId = parseInt(req.body.cursoId);    

    let profesor = modelos.profesores.findById(profesoresId);  
    if (!profesor) {
        return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    let curso = modelos.cursos.findById(cursoId);
    if (!curso) {
        return res.status(404).json({ error: 'Curso no encontrado' });
    }


    if (!profesor.cursosInscritos.includes(cursoId)) {
        profesor.cursosInscritos.push(cursoId);  
        modelos.profesores.update(profesoresId, profesor); 
        curso.profesorId = profesoresId; 
        modelos.cursos.update(cursoId, curso); 
    }

    res.status(200).json({
        msg: 'Profesor inscrito exitosamente en el curso',
        cursosInscritos: profesor.cursosInscritos  
    });
};

// Método para desinscribir a un profesor de un curso
const disenrollProfesores = function (req, res) {
    const profesoresId = parseInt(req.params.id); 
    const cursoId = parseInt(req.body.cursoId);    


    let profesor = modelos.profesores.findById(profesoresId);
    if (!profesor) {
        return res.status(404).json({ error: 'Profesor no encontrado' });
    }


    let curso = modelos.cursos.findById(cursoId);
    if (!curso) {
        return res.status(404).json({ error: 'Curso no encontrado' });
    }


    profesor.cursosInscritos = profesor.cursosInscritos.filter(id => id !== cursoId);  
    curso.profesorId = null;
    modelos.profesores.update(profesoresId, profesor);

    res.status(200).json({
        msg: 'Profesor desinscrito exitosamente del curso',
        cursosInscritos: profesor.cursosInscritos  
    });
};

// Método para regresar todos los cursos a los que está inscrito un profesor
const cursosInscritosProfesores = function (req, res) {
    const profesoresId = parseInt(req.params.id);  

    let profesor = modelos.profesores.findById(profesoresId);
    if (!profesor) {
        return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    const cursosInscritosIds = profesor.cursosInscritos;
    const cursosInfo = cursosInscritosIds.map(cursoId => modelos.cursos.findById(cursoId)).filter(curso => curso !== undefined);

    res.status(200).json({
        cursos: cursosInfo  
    });
};

// metodo para regresar todos los alumnos inscritos de un profesor
const getEstudiantesProfesor = function (req, res) {
    const profesoresId = parseInt(req.params.id);  

    let profesor = modelos.profesores.findById(profesoresId);
    if (!profesor) {
        return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    const estudiantesInscritos = modelos.estudiantes.findAll().filter(estudiante =>
        estudiante.cursosInscritos.some(cursoId => profesor.cursosInscritos.includes(cursoId))
    );

    res.status(200).json({
        estudiantes: estudiantesInscritos
    });
    
};



exports.getAllProfesores = getAllProfesores;
exports.getProfesores = getProfesores;
exports.createProfesores = createProfesores;
exports.updateProfesores = updateProfesores;
exports.deleteProfesores = deleteProfesores;

exports.enrollProfesores = enrollProfesores
exports.disenrollProfesores = disenrollProfesores;
exports.cursosInscritosProfesores = cursosInscritosProfesores;
exports.getEstudiantesProfesor = getEstudiantesProfesor;
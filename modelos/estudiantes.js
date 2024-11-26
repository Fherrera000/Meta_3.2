const estudiantes = [
    {
        id: 1,
        nombre: 'Juan Camaney',
        matricula: 123456,
        semestreIngreso: '2016-2',
        creditosCursados: 200,
        cursosInscritos: []
    },
    {
        id: 2,
        nombre: 'Lupita López',
        matricula: 654321,
        semestreIngreso: '2017-2',
        creditosCursados: 100,
        cursosInscritos: []
    }
];

const erase = function (id) {
    let registro = estudiantes.find((e) => {
        return e.id == id;
    });
    if(registro){
        if(estudiantes.splice(estudiantes.indexOf(registro),1)!= -1)
            return true;
        return false;
    }
    return false;
};

const findById = function (id) {
    return estudiantes.find((e) => {
        return e.id == id;
    });
};

const findByMatricula = function (matricula) {
    return estudiantes.find((e) => {
        return e.matricula == matricula;
    });
};
const findAll = function() {
  return estudiantes;
};

const add = function (estudiante) {

    estudiantes.push(estudiante);
    return estudiante;
};


const save = function (id, nuevoEstudiante) {
    let index = estudiantes.findIndex((e) => e.id == id);
    if (index !== -1) {
        estudiantes[index] = { ...nuevoEstudiante, id }; 
        return estudiantes[index];
    }
    return null;
};

const update = function (id, nuevosDatos) {

    let index = estudiantes.findIndex((e) => e.id == id);
    
    if (index !== -1) {
        estudiantes[index] = { ...estudiantes[index], ...nuevosDatos }; 
        return estudiantes[index]; 
    
    return null;
}};

exports.findById = findById;
exports.findByMatricula = findByMatricula;
exports.findAll = findAll;
exports.add = add;
exports.save = save;
exports.erase = erase;
exports.update = update;
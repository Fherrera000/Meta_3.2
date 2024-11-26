const profesores = [
    {
        id: 1,
        nombre: 'Jose Emannuel',
        noEmpleado: 123456,
        cursosInscritos: []
    },
    {
        id: 2,
        nombre: 'Maria Jose',
        noEmpleado: 987654,
        cursosInscritos: [],
        estudiantesInscritos: []
    }
];

const erase = function (id) {
    let registro = profesores.find((e) => {
        return e.id == id;
    });
    if(registro){
        if(profesores.splice(profesores.indexOf(registro),1)!= -1)
            return true;
        return false;
    }
    return false;
};

const findById = function (id) {
    return profesores.find((e) => {
        return e.id == id;
    });
};

const findByNoEmpleado = function (noEmpleado) {
    return profesores.find((e) => {
        return e.noEmpleado == noEmpleado;
    });
};
const findAll = function() {
  return profesores;
};

const add = function (nuevoProfesores) {

    profesores.push(nuevoProfesores);
    return profesores;
};


const save = function (id, nuevoProfesor) {
    let index = profesores.findIndex((e) => e.id == id);
    if (index !== -1) {
        profesores[index] = { ...nuevoProfesor, id }; 
        return profesores[index];
    }
    return null;
};

const update = function (id, nuevosDatos) {

    let index = profesores.findIndex((e) => e.id == id);
    
    if (index !== -1) {
        profesores[index] = { ...profesores[index], ...nuevosDatos }; 
        return profesores[index]; 
    
    return null;
}};

exports.findById = findById;
exports.findByNoEmpleado = findByNoEmpleado;
exports.findAll = findAll;
exports.add = add;
exports.save = save;
exports.erase = erase;
exports.update = update;
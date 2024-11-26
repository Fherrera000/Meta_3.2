const cursos = [
    {
      id: 1,
      nombre: 'Calculo',
      claveMateria: 12345,
      salon: '313',
      grupo: '240-1',
      profesorId: null
    },
    {
        id: 2,
        nombre: 'Ingles',
        claveMateria: 12345,
        salon: '408',
        grupo: '240-2',
        profesorId: null
      },

]

const erase = function (id) {
    let registro = cursos.find((e) => {
        return e.id == id;
    });
    if(registro){
        if(cursos.splice(cursos.indexOf(registro),1)!= -1)
            return true;
        return false;
    }
    return false;
};

const findById = function (id) {
    return cursos.find((e) => {
        return e.id == id;
    });
};



const findAll = function() {
return cursos;
}

const add = function (nuevoCursos) {

    cursos.push(nuevoCursos);
    return cursos;
};


const save = function (id, nuevoCurso) {
    let index = cursos.findIndex((e) => e.id == id);
    if (index !== -1) {
        cursos[index] = { ...nuevoCursos, id }; 
        return cursos[index];
    }
    return null;
};

const update = function (id, nuevosDatos) {

    let index = cursos.findIndex((e) => e.id == id);
    
    if (index !== -1) {
        cursos[index] = { ...cursos[index], ...nuevosDatos }; 
        return cursos[index]; 
    
    return null;
}};




exports.findById = findById;
exports.findAll = findAll;
exports.add = add;
exports.save = save;
exports.erase = erase;
exports.update = update;
const express = require("express");
const router = express.Router();
const controladores = require("../controladores");

router.get('/profesores', controladores.profesoresController.getAllProfesores);
router.get('/profesores/:id', controladores.profesoresController.getProfesores);
router.post('/profesores', controladores.profesoresController.createProfesores);
router.put('/profesores/:id', controladores.profesoresController.updateProfesores);
router.patch('/profesores/:id', controladores.profesoresController.updateProfesores);
router.delete('/profesores/:id', controladores.profesoresController.deleteProfesores);
router.patch('/profesores/:id/enroll', controladores.profesoresController.enrollProfesores);
router.patch('/profesores/:id/disenroll', controladores.profesoresController.disenrollProfesores);
router.get('/profesores/:id/cursos', controladores.profesoresController.cursosInscritosProfesores);
router.get('/profesores/:id/estudiantes', controladores.profesoresController.getEstudiantesProfesor);

module.exports = router;
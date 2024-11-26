const express = require("express");
const router = express.Router();
const controladores = require("../controladores");

router.get('/estudiantes', controladores.estudiantesController.getAllEstudiantes);
router.get('/estudiantes/:id', controladores.estudiantesController.getEstudiante);
router.post('/estudiantes', controladores.estudiantesController.createEstudiante);
router.put('/estudiantes/:id', controladores.estudiantesController.updateEstudiante);
router.patch('/estudiantes/:id', controladores.estudiantesController.updateEstudiante);
router.delete('/estudiantes/:id', controladores.estudiantesController.deleteEstudiante);
router.patch('/estudiantes/:id/enroll', controladores.estudiantesController.enrollEstudiante);
router.patch('/estudiantes/:id/disenroll', controladores.estudiantesController.disenrollEstudiante);
router.get('/estudiantes/:id/cursos', controladores.estudiantesController.cursosInscritosEstudiantes);
router.get('/estudiantes/:id/profesores', controladores.estudiantesController.getProfesoresEstudiantes);


module.exports = router;
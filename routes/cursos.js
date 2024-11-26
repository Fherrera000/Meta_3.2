const express = require("express");
const router = express.Router();
const controladores = require("../controladores");

router.get('/cursos', controladores.cursosController.getAllCursos);
router.get('/cursos/:id', controladores.cursosController.getCursos);
router.post('/cursos', controladores.cursosController.createCursos);
router.put('/cursos/:id', controladores.cursosController.updateCursos);
router.patch('/cursos/:id', controladores.cursosController.updateCursos);
router.delete('/cursos/:id', controladores.cursosController.deleteCursos);


module.exports = router;
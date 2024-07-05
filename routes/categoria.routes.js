const express = require("express");
const router = express.Router();

const controller = require("../controllers/categoria.controller");

router.get("/", controller.listado);
router.get("/:id_categoria", controller.obtenerPorId);
router.post("/", controller.agregar);
router.put("/:id_categoria", controller.actualizar);
router.delete("/:id_categoria", controller.eliminar);

module.exports = router;
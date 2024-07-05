const express = require("express");
const router = express.Router();

const controller = require("../controllers/contacto.controller");

router.get("/", controller.listado);
router.get("/:id_contacto", controller.obtenerPorId);
router.post("/", controller.agregar);
router.put("/:id_contacto", controller.actualizar);
router.delete("/:id_contacto", controller.eliminar);

module.exports = router;
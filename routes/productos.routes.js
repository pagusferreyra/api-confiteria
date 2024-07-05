const express = require("express");
const router = express.Router();

const controller = require("../controllers/productos.controller");

router.get("/", controller.listado);
router.get("/:id_productos", controller.obtenerPorId);
router.post("/", controller.agregar);
router.put("/:id_productos", controller.actualizar);
router.delete("/:id_productos", controller.eliminar);

module.exports = router;
const express = require("express");
const router = express.Router();

const controller = require("../controllers/sucursales.controller");

router.get("/", controller.listado);
router.get("/:id_sucursal", controller.obtenerPorId);
router.post("/", controller.agregar);
router.put("/:id_sucursal", controller.actualizar);
router.delete("/:id_sucursal", controller.eliminar);

module.exports = router;
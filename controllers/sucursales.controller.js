const bd = require("../db/db");

// Listado entero.
const listado = (req, res) => {
  const sql = "SELECT * FROM sucursales";
  bd.query(sql, (error, rows) => {
    if (error) {
      console.error("Error de la Base de Datos ", error);
      return res
        .status(500)
        .json({ error: "Intente Luego", details: error.message });
    }
    res.json(rows);
  });
};

// Busqueda por id.
const obtenerPorId = (req, res) => {
  console.log(req.params);
  const { id_sucursal } = req.params;
  const sql = "SELECT * FROM sucursales WHERE id_sucursal = ?";
  bd.query(sql, [id_sucursal], (error, rows) => {
    if (error) {
      console.error("Error en la base de datos:", error);
      return res
        .status(500)
        .json({ error: "Intente luego.", details: error.message });
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    res.json(rows[0]);
  });
};

// Creacion de un producto.
const agregar = (req, res) => {
  const { direccion, vigencia } = req.body;
  const sql = "INSERT INTO sucursales (direccion, vigencia) VALUES (?, ?)";

  bd.query(sql, [direccion, vigencia], (error, result) => {
    if (error) {
      console.error("Error de consulta a la base de datos:", error);
      return res.status(500).json({ error: "Intente más tarde" });
    }

    const sucursal = {
      id: result.insertId,
      direccion,
      vigencia,
    };

    res.status(201).json(sucursal);
  });
};

// Actualizacion de un producto.
const actualizar = (req, res) => {
  const { id_sucursal } = req.params;
  const { direccion, vigencia } = req.body;

  const sql = "UPDATE sucursales SET direccion = ?, vigencia = ? WHERE id_sucursal = ?";

  bd.query(sql, [direccion, vigencia, id_sucursal], (error, result) => {
    if (error) {
      console.error("Error de consulta a la base de datos:", error);
      return res.status(500).json({ error: "Intente más tarde" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    const producto = { ...req.body, ...req.params };
    res.json(producto);
  });
};

// Eliminacion de un producto.
const eliminar = (req, res) => {
  const { id_sucursal } = req.params;
  const sql = "DELETE FROM sucursales WHERE id_sucursal = ?";

  bd.query(sql, [id_sucursal], (error, result) => {
    if (error) {
      console.error("Error de consulta a la base de datos:", error);
      return res.status(500).json({ error: "Intente más tarde" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado correctamente" });
  });
};

module.exports = {
  listado,
  agregar,
  obtenerPorId,
  actualizar,
  eliminar,
};
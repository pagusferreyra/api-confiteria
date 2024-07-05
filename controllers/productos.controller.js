const connect = require("../db/db");

// Listado entero.

const listado = (req, res) => {
  const sql = "SELECT * FROM productos";
  connect.query(sql, (error, rows) => {
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
  const { id_productos } = req.params;
  const sql = "SELECT * FROM productos WHERE id_productos = ?";
  connect.query(sql, [id_productos], (error, rows) => {
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
  const { nombre, stock, precio, id_categoria } = req.body;

  const sql =
    "INSERT INTO productos (nombre, stock, precio, id_categoria) VALUES (?, ?, ?, ?)";

  connect.query(
    sql,
    [nombre, stock, precio, id_categoria],
    (error, result) => {
      if (error) {
        console.error("Error de consulta a la base de datos:", error);
        return res.status(500).json({ error: "Intente más tarde" });
      }

      const producto = {
        id: result.insertId,
        nombre,
        stock,
        precio,
        id_categoria,
      };

      res.status(201).json(producto);
    }
  );
};

// Actualizacion de un producto.

const actualizar = (req, res) => {
  const { id_productos } = req.params;
  const { nombre, stock, precio, id_categoria } = req.body;


  const sql =
    "UPDATE productos SET nombre = ?, stock = ?, precio = ?, id_categoria = ? WHERE id_productos = ?";

  connect.query(
    sql,
    [nombre, stock, precio, id_categoria, id_productos],
    (error, result) => {
      if (error) {
        console.error("Error de consulta a la base de datos:", error);
        return res.status(500).json({ error: "Intente más tarde" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      const producto = { ...req.body, ...req.params };
      res.json(producto);
    }
  );
};

// Eliminacion de un producto.

const eliminar = (req, res) => {
  const { id_productos } = req.params;
  const sql = "DELETE FROM productos WHERE id_productos = ?";

  connect.query(sql, [id_productos], (error, result) => {
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
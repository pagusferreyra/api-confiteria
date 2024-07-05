const bd = require("../db/db");

// Listado entero.
const listado = (req, res) => {
  const sql = "SELECT * FROM categorias";
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

// Búsqueda por id.
const obtenerPorId = (req, res) => {
  const { id_categoria } = req.params;
  const sql = "SELECT * FROM categorias WHERE id_categoria = ?";
  bd.query(sql, [id_categoria], (error, rows) => {
    if (error) {
      console.error("Error en la base de datos:", error);
      return res
        .status(500)
        .json({ error: "Intente luego.", details: error.message });
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: "Categoría no encontrada." });
    }

    res.json(rows[0]);
  });
};

// Creación de una categoría.
const agregar = (req, res) => {
  const { categoria } = req.body;
  const sql = "INSERT INTO categorias (categoria) VALUES (?)";

  bd.query(sql, [categoria], (error, result) => {
    if (error) {
      console.error("Error de consulta a la base de datos:", error);
      return res.status(500).json({ error: "Intente más tarde" });
    }

    const categoriaCreada = {
      id_categoria: result.insertId,
      categoria,
    };

    res.status(201).json(categoriaCreada);
  });
};

// Actualización de una categoría.
const actualizar = (req, res) => {
  const { id_categoria } = req.params;
  const { categoria } = req.body;

  if (!categoria) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  const sql = "UPDATE categorias SET categoria = ? WHERE id_categoria = ?";

  bd.query(sql, [categoria, id_categoria], (error, result) => {
    if (error) {
      console.error("Error de consulta a la base de datos:", error);
      return res.status(500).json({ error: "Intente más tarde" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    const categoriaActualizada = { ...req.body, ...req.params };
    res.json(categoriaActualizada);
  });
};

// Eliminación de una categoría.
const eliminar = (req, res) => {
  const { id_categoria } = req.params;
  const sql = "DELETE FROM categorias WHERE id_categoria = ?";

  bd.query(sql, [id_categoria], (error, result) => {
    if (error) {
      console.error("Error de consulta a la base de datos:", error);
      return res.status(500).json({ error: "Intente más tarde" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.json({ message: "Categoría eliminada correctamente" });
  });
};

module.exports = {
  listado,
  agregar,
  obtenerPorId,
  actualizar,
  eliminar,
};

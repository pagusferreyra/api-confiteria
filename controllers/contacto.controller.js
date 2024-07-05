const bd = require("../db/db");

// Listado entero.
const listado = (req, res) => {
  const sql = "SELECT * FROM contacto";
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
  const { id_contacto } = req.params;
  const sql = "SELECT * FROM contacto WHERE id_contacto = ?";
  bd.query(sql, [id_contacto], (error, rows) => {
    if (error) {
      console.error("Error en la base de datos:", error);
      return res
        .status(500)
        .json({ error: "Intente luego.", details: error.message });
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: "Contacto no encontrado." });
    }

    res.json(rows[0]);
  });
};

// Creación de un contacto.
const agregar = (req, res) => {
  const { nombre, apellido, genero, gmail, como_nos_conociste } = req.body;
  const sql =
    "INSERT INTO contacto (nombre, apellido, genero, gmail, como_nos_conociste) VALUES (?, ?, ?, ?, ?)";

  bd.query(
    sql,
    [nombre, apellido, genero, gmail, como_nos_conociste],
    (error, result) => {
      if (error) {
        console.error("Error de consulta a la base de datos:", error);
        return res.status(500).json({ error: "Intente más tarde" });
      }

      const contacto = {
        id_contacto: result.insertId,
        nombre,
        apellido,
        genero,
        gmail,
        como_nos_conociste,
      };

      res.status(201).json(contacto);
    }
  );
};

// Actualización de un contacto.
const actualizar = (req, res) => {
  const { id_contacto } = req.params;
  const { nombre, apellido, genero, gmail, como_nos_conociste } = req.body;

  if (!nombre || !apellido || !genero || !gmail || !como_nos_conociste) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  const sql =
    "UPDATE contacto SET nombre = ?, apellido = ?, genero = ?, gmail = ?, como_nos_conociste = ? WHERE id_contacto = ?";

  bd.query(
    sql,
    [nombre, apellido, genero, gmail, como_nos_conociste, id_contacto],
    (error, result) => {
      if (error) {
        console.error("Error de consulta a la base de datos:", error);
        return res.status(500).json({ error: "Intente más tarde" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Contacto no encontrado" });
      }
      const contacto = { ...req.body, ...req.params };
      res.json(contacto);
    }
  );
};

// Eliminación de un contacto.
const eliminar = (req, res) => {
  const { id_contacto } = req.params;
  const sql = "DELETE FROM contacto WHERE id_contacto = ?";

  bd.query(sql, [id_contacto], (error, result) => {
    if (error) {
      console.error("Error de consulta a la base de datos:", error);
      return res.status(500).json({ error: "Intente más tarde" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Contacto no encontrado" });
    }
    res.json({ message: "Contacto eliminado correctamente" });
  });
};

module.exports = {
  listado,
  agregar,
  obtenerPorId,
  actualizar,
  eliminar,
};

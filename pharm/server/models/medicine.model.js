const db = require("../config/db"); // mysql2 pool.promise()

const Medicine = {
  // GET ALL
  async getAll() {
    const [rows] = await db.query("SELECT * FROM medicines");
    return rows;
  },

  // GET BY ID (dùng cho update/delete check tồn tại)
  async getById(id) {
    const [rows] = await db.query("SELECT * FROM medicines WHERE id = ?", [id]);
    return rows[0];
  },

  // CREATE
  async create(data) {
    const { name, description, price, quantity } = data;

    const [result] = await db.query(
      `INSERT INTO medicines (name, description, price, quantity)
       VALUES (?, ?, ?, ?)`,
      [name, description, price, quantity],
    );

    return {
      id: result.insertId,
      name,
      description,
      price,
      quantity,
    };
  },

  // UPDATE
  async update(id, data) {
    const { name, description, price, quantity } = data;

    await db.query(
      `UPDATE medicines
       SET name = ?, description = ?, price = ?, quantity = ?
       WHERE id = ?`,
      [name, description, price, quantity, id],
    );

    return {
      id,
      name,
      description,
      price,
      quantity,
    };
  },

  // DELETE
  async remove(id) {
    await db.query("DELETE FROM medicines WHERE id = ?", [id]);
    return { message: "Deleted successfully" };
  },
};

module.exports = Medicine;

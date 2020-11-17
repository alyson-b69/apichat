const db = require("../config/db");

class UsersModel {
  static findAllWithoutOne(where, callback) {
    db.query(
      "SELECT id, name, email FROM users WHERE id <> ? ORDER BY name ASC",
      [where, where],
      callback
    );
  }

  static findAllBy(where, callback) {
    db.query(
      "SELECT DISTINCT users.id, users.name, users.email FROM messages JOIN users ON users.id IN (messages.sender_id, messages.receiver_id) WHERE ? IN (messages.sender_id, messages.receiver_id) AND users.id <> ? GROUP BY users.id ORDER BY users.name ASC ",
      [where, where],
      callback
    );
  }

  static findBy(where, callback) {
    db.query(
      "SELECT id, name, email FROM users WHERE name = ? OR email = ?",
      where,
      callback
    );
  }

  static findById(where, callback) {
    db.query("SELECT id, name, email FROM users WHERE ?", where, callback);
  }

  static findByLogin(body, callback) {
    db.query(
      "SELECT id, name, email FROM users WHERE email = ? AND password = ?",
      body,
      callback
    );
  }

  static create(data, callback) {
    db.query("INSERT INTO users SET ?", data, callback);
  }

  static updateBy(data, where, callback) {
    db.query("UPDATE users SET ? WHERE ?", [data, where], callback);
  }

  static deleteBy(where, callback) {
    db.query("DELETE FROM users WHERE ?", where, callback);
  }
}

module.exports = UsersModel;

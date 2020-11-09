const db = require("../config/db");

class UsersModel {
  static find(callback) {
    db.query(
      "SELECT id, name, email, password FROM users ORDER BY id ASC",
      callback
    );
  }

  static findBy(where, callback) {
    db.query("SELECT id, name, email FROM users WHERE ?", where, callback);
  }

  static findByLogin(body, callback) {
    db.query(
      "SELECT id, name, email FROM users WHERE name = ? AND password = ?",
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

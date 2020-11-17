const db = require("../config/db");

class MessagesModel {
  static find(callback) {
    db.query(
      "SELECT id, sender_id, receiver_id, message, created_at, is_read FROM messages ORDER BY id ASC",
      callback
    );
  }

  static findAllBy(where, callback) {
    db.query(
      "SELECT id, sender_id, receiver_id, message, created_at, is_read FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (receiver_id = ? AND sender_id = ?) ORDER BY created_at ASC",
      where,
      callback
    );
  }

  static create(data, callback) {
    db.query("INSERT INTO messages SET ?", data, callback);
  }

  static updateBy(data, where, callback) {
    db.query("UPDATE messages SET ? WHERE ?", [data, where], callback);
  }

  static deleteBy(where, callback) {
    db.query("DELETE FROM messages WHERE ?", where, callback);
  }
}

module.exports = MessagesModel;

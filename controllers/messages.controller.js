const MessagesModel = require("../models/messages.model");

class MessagesController {
  static getAll(req, res) {
    MessagesModel.find((err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(results);
    });
  }

  static getAllFrom(req, res) {
    MessagesModel.findAllBy(
      [
        req.query.userId,
        req.query.userId2,
        req.query.userId,
        req.query.userId2,
      ],
      (err, results) => {
        if (err) {
          res.status(500).send(err);
        }
        res.send(results);
      }
    );
  }

  static createOne(req, res) {
    MessagesModel.create(req.body, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(201).send(`Message added with ID: ${results.insertId}`);
    });
  }

  static updateOne(req, res) {
    MessagesModel.updateBy(req.body, { id: req.params.id }, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(202).send(results);
    });
  }

  static deleteOne(req, res) {
    MessagesModel.deleteBy({ id: req.params.id }, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(202).send(`This message is delete : ${req.params.id}`);
    });
  }
}

module.exports = MessagesController;

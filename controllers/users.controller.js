const UsersModel = require("../models/users.model");
const { validationResult } = require("express-validator");
const { generatePassword } = require("../lib/utils");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

class UsersController {
  static getAll(req, res) {
    UsersModel.find((err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(results);
    });
  }

  static getOne(req, res) {
    UsersModel.findBy({ id: parseInt(req.params.id) }, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(results);
    });
  }

  static login(req, res) {
    UsersModel.findByLogin(
      [req.body.name, generatePassword(req.body.password)],
      (err, results) => {
        if (err) {
          res.status(500).send(err);
        } else {
          if (results[0] !== undefined) {
            const name = req.body.name;
            let token = jwt.sign({ name }, process.env.JWT_KEY);
            res.status(200).send({ token });
          } else {
            res.sendStatus(401);
          }
        }
      }
    );
  }

  static createOne(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      req.body.password = generatePassword(req.body.password);
      UsersModel.create(req.body, (err, results) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(201).send(`User added with ID: ${results.insertId}`);
      });
    }
  }

  static updateOne(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      req.body.password = generatePassword(req.body.password);
      UsersModel.updateBy(req.body, { id: req.params.id }, (err, results) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(202).send(results);
      });
    }
  }

  static deleteOne(req, res) {
    UsersModel.deleteBy({ id: req.params.id }, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(202).send(`This user is delete : ${req.params.id}`);
    });
  }
}

module.exports = UsersController;

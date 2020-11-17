const UsersModel = require("../models/users.model");
const { validationResult } = require("express-validator");
const { generatePassword } = require("../lib/utils");
const { JWTGenerate } = require("../lib/JWT");

class UsersController {
  static getAll(req, res) {
    UsersModel.findAllWithoutOne([req.query.userId], (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(results);
    });
  }

  static getAllWithMessages(req, res) {
    UsersModel.findAllBy([req.query.userId], (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(results);
    });
  }

  static getOne(req, res) {
    UsersModel.findById({ id: parseInt(req.params.id) }, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(results);
    });
  }

  static login(req, res) {
    UsersModel.findByLogin(
      [req.body.email, generatePassword(req.body.password)],
      (err, results) => {
        if (err) {
          res.status(500).send(err);
        } else {
          if (results[0] !== undefined) {
            const id = results[0].id;
            const name = results[0].name;
            const email = results[0].email;
            let token = JWTGenerate(
              req,
              JSON.parse(JSON.stringify(results[0])),
              60
            );
            res.status(200).send({ token, id: id, email: email, name: name });
          } else {
            res.sendStatus(401);
          }
        }
      }
    );
  }

  static findAllBy(req, res) {
    UsersModel.findBy([req.body.name, req.body.email], (err, result) => {
      if (err) {
        res.status(500).send(JSON.stringify({ err }));
      } else {
        res.status(200).send(result);
      }
    });
  }

  static createOne(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors });
    } else {
      UsersModel.findBy([req.body.name, req.body.email], (err, result) => {
        if (err) {
          res.status(500).send(JSON.stringify({ err }));
        } else {
          console.log("Result in findBy : ", result);
          if (result[0] === undefined) {
            req.body.password = generatePassword(req.body.password);
            UsersModel.create(req.body, (err, results) => {
              if (err) {
                res.status(500).send(JSON.stringify({ err }));
              }
              res.status(201).json(`User added`);
            });
          } else {
            res
              .status(409)
              .send(
                JSON.stringify({ duplicate: "name or email already exist" })
              );
          }
        }
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
          res.status(500).send(JSON.stringify({ err }));
        }
        res.status(202).json(results);
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

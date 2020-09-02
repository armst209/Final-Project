const express = require("express");
const charinfo = express.Router();
const database = require("../connection");

//INSERT ARRAY & METHODS


//GET

charinfo.get("/", (req, res) => {
    database.query("SELECT * FROM charstats").then(
      (result) => {
        res.send(result.rows);
      },
      (error) => {
        res.sendStatus(500);
      }
    );
  });

  charinfo.get("/:id", (req, res) => {
    database.query(`SELECT * FROM charstats WHERE id=${req.params.id}`).then(
      (result) => {
        res.send(result.rows);
      },
      (error) => {
        res.sendStatus(500);
      }
    );
  });

//POST
charinfo.post("/", (req, res) => {
    database.query(`INSERT INTO charstats (charimage, id, name, hp, superpower, speed, jumpheight, magicpoints, weapon) VALUES ('${req.body.charimage}', ${req.body.id}, '${req.body.name}', ${req.body.hp}, '${req.body.superpower}', ${req.body.speed}, ${req.body.jumpheight}, ${req.body.magicpoints}, '${req.body.weapon}')`
      ).then(
          (result) => {
          res.send(req.body);
        },
        (error) => {
          res.sendStatus(500);
        }
      );
  });

//PUT

charinfo.put("/:id", (req, res) => {
    database.query(`UPDATE charstats SET charimage='${req.body.charimage}', id=${req.body.id}, name='${req.body.name}', hp=${req.body.hp}, superpower='${req.body.superpower}', speed=${req.body.speed}, jumpheight=${req.body.jumpheight}, magicpoints=${req.body.magicpoints}, weapon='${req.body.weapon}' WHERE id=${req.params.id}`
      )
      .then(
        (result) => {
          res.send(req.body);
        },
        (error) => {
          res.sendStatus(500);
        }
      );
  });
  

//DELETE

charinfo.delete("/:id", (req, res) => {
    database.query(`DELETE FROM charstats WHERE id=${req.params.id}`).then(
      (result) => {
        res.sendStatus(200);
      },
      (error) => {
        res.sendStatus(500);
      }
    );
  });

module.exports = charinfo;
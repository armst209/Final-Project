const express = require("express");
const login = express.Router();
const database = require("../connection");

//INSERT ARRAY & METHODS


//GET

login.get("/", (req, res) => {
    database.query("SELECT * FROM login").then(
      (result) => {
        res.send(result.rows);
      },
      (error) => {
        res.sendStatus(500);
      }
    );
  });

  
  login.get("/:id", (req, res) => {
    database.query(`SELECT * FROM login WHERE id=${req.params.id}`).then(
      (result) => {
        res.send(result.rows);
      },
      (error) => {
        res.sendStatus(500);
      }
    );
  });


//POST
login.post("/", (req, res) => {
  database.query(`INSERT INTO login (id) VALUES (${req.body.id})`
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
login.put("/:id", (req, res) => {
  database.query(`UPDATE login SET id=${req.body.id} WHERE id=${req.params.id}`
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

login.delete("/:id", (req, res) => {
  database.query(`DELETE FROM login WHERE id=${req.params.id}`).then(
    (result) => {
      res.sendStatus(200);
    },
    (error) => {
      res.sendStatus(500);
    }
  );
});



module.exports = login;
const express = require("express");
const scores = express.Router();
const database = require("../connection");

//INSERT ARRAY & METHODS


//GET

scores.get("/", (req, res) => {
    database.query("SELECT * FROM highscore").then(
      (result) => {
        res.send(result.rows);
      },
      (error) => {
        res.sendStatus(500);
      }
    );
  });

  
  scores.get("/:id", (req, res) => {
    database.query(`SELECT * FROM highscore WHERE id=${req.params.id}`).then(
      (result) => {
        res.send(result.rows);
      },
      (error) => {
        res.sendStatus(500);
      }
    );
  });


//POST

scores.post("/", (req, res) => {
  database.query(`INSERT INTO highscore (id, score) VALUES (${req.body.id}, ${req.body.score})`
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

scores.put("/:id", (req, res) => {
  database.query(`UPDATE highscore SET id=${req.body.id}, score=${req.body.score} WHERE id=${req.params.id}`
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

scores.delete("/:id", (req, res) => {
  database.query(`DELETE FROM highscore WHERE id=${req.params.id}`).then(
    (result) => {
      res.sendStatus(200);
    },
    (error) => {
      res.sendStatus(500);
    }
  );
});


module.exports = scores;
//NPM INSTALL EXPRESS & CORS AFTER NODE MODULES(NPM INIT)
//NPM INSTALL NODE PG (NPM PG)
//LINK SERVER ON HEROKU
//CREATE GIT INIT FIRST THEN NEW HEROKU
//CREATE DATABASE WITH PGADMIN

const express = require('express');
const app = express();

const cors = require('cors');
//LINKING ROUTES.JS
const routes = require("./routes/charinfo");


//CORS
app.use(cors());

//JSON USAGE
app.use(express.json());

//ROUTING
app.use('/characters', routes);

//LISTENING ON PORT
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});

const { Pool } = require("pg");
try {
  require("dotenv").config();
} catch (e) {}
const connectionString ="postgres://zefnmbpqhxjihq:af87bf5b07f14c088b6dd186ccf625e0908373a60a8b46f5202df696e39ef145@ec2-52-202-66-191.compute-1.amazonaws.com:5432/d6u21f38a66h6m";
const pool = new Pool({
  connectionString: connectionString,
  ssl: connectionString.includes("localhost")
    ? false
    : {
        rejectUnauthorized: false,
      },
});
module.exports = pool;

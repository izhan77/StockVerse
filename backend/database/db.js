const { Pool } = require("pg"); // importing Pool class from pg library
require("dotenv").config(); // loads environment variables from a .env file into process.env

// creating PostgreSQL connection Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// exporting the pool object
module.exports = pool;

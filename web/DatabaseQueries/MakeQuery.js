// Import the required module
const { Pool } = require("pg");
const hostname = process.env.hostname ?? "";
const database = process.env.databaseName ?? "";
const username = process.env.userName ?? "";
const password = process.env.password ?? "";
const port = process.env.port ?? "";

export async function makeQuery(query, params = []) {
  // Create a new connection pool
  const pool = new Pool({
    user: username,
    host: hostname,
    database: database,
    password: password,
    port: port,
  });

  try {
    // Connect to the database
    const client = await pool.connect();

    // Execute the query with provided parameters
    const result = await client.query(query, params);

    // Release the client back to the pool
    client.release();

    // Return the fetched data
    return result.rows;
  } catch (error) {
    // Handle errors and log them
    console.error("Error in make query:", error);
    return { error: error.message };
  }
}

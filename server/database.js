const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',     
  host: 'localhost',
  database: 'employeesinfo',
  password:  'Vinhit07&',
  port: 5432,
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    //const createDatabaseQuery = `CREATE DATABASE employeestable`;
    //await pool.query(createDatabaseQuery);
    console.log('PostgreSQL connected successfully');
    const createTableQuery = `
       CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        employee_id VARCHAR(10) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone_number VARCHAR(10) NOT NULL,
        department VARCHAR(50) NOT NULL,
        date_of_joining DATE NOT NULL,
        role VARCHAR(100) NOT NULL
      )
    `;
    await client.query(createTableQuery);
    console.log('table created or already exists');   
    client.release();
  } catch (err) {
    console.error('Db connection error:', err);
  }
};

module.exports = {connectDB,pool};
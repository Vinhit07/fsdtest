const express = require('express');
const { pool } = require('./database');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      employeeId, 
      email, 
      phoneNumber, 
      department, 
      dateOfJoining, 
      role 
    } = req.body;

    const existingCheck = await pool.query(
      'SELECT * FROM employees WHERE employee_id = $1 OR email = $2', 
      [employeeId, email]
    );

    if (existingCheck.rows.length > 0) {
      return res.status(400).json({ 
        message: 'Employee ID or Email already exists' 
      });
    }

    const result = await pool.query(
      `INSERT INTO employees 
      (first_name, last_name, employee_id, email, phone_number, department, date_of_joining, role) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        firstName, 
        lastName, 
        employeeId, 
        email, 
        phoneNumber, 
        department, 
        dateOfJoining, 
        role
      ]
    );

    res.status(201).json({
      message: 'Employee added successfully',
      employee: result.rows[0]
    });
  } catch (err) {
    console.error('Error while adding employee:', err);
    console.log(err);
    res.status(500).json({ 
      message: 'Failed to add employee', 
      error: err.message 
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ 
      message: 'Failed to fetch employees', 
      error: err.message 
    });
  }
});

module.exports = router;
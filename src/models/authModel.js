const argon2 = require('argon2');
const pool = require('../config/db');

exports.login = async (email, password) => {
  try {
    const query = `SELECT * FROM users WHERE email = '${email}'`;
    const result = await pool.query(query);

    if (result.rowCount > 0) {
      const user = result.rows[0];
      if (await argon2.verify(user.password, password)) {
        return user;
      } else { throw new Error('Wrong password!'); }

    } else {
      throw new Error('Email not found, please register if you don`t have account before');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.register = async (username,email,password) => {
  try{
    const emailCheckQuery = `SELECT * FROM users WHERE email = $1`;
    const emailCheckResult = await pool.query(emailCheckQuery,[email]);

    if (emailCheckResult.rowCount > 0) {
      throw new Error('Email sudah terdaftar');
    }

    const hashedPassword = await argon2.hash(password);

    const insertQuery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id, username, email`;
    const insertResult = await pool.query(insertQuery,[username,email,hashedPassword]);

    return insertResult.rows[0];
  } catch (error) {
    // console.log(error.message)
    throw new Error(error.message)
  }
};

exports.getUserById = async (userId) => {
  try {
    const query = 'SELECT * FROM users WHERE user_id = $1';
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

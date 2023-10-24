const pool = require('../config/db');

// Membuat artikel baru
const createArticle = async (title, content, author_name, img) => {
  const query = 'INSERT INTO articles (title, content, author_name, img) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [title, content, author_name, img];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Memperbarui artikel berdasarkan ID
const updateArticle = async (id, title, content, author_name, img) => {
  let query;
  let values;

  if (img !== undefined) {
    query = 'UPDATE articles SET title = $2, content = $3, author_name = $4, img = $5 WHERE id = $1 RETURNING *';
    values = [id, title, content, author_name, img];
  } else {
    query = 'UPDATE articles SET title = $2, content = $3, author_name = $4 WHERE id = $1 RETURNING *';
    values = [id, title, content, author_name];
  }

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};


// Menghapus artikel berdasarkan ID
const deleteArticle = async (id) => {
  const query = 'DELETE FROM articles WHERE id = $1';
  const values = [id];

  try {
    await pool.query(query, values);
  } catch (error) {
    throw error;
  }
};

// Mengambil semua artikel
const getAllArticles = async () => {
  const query = 'SELECT * FROM articles';

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

// Menemukan artikel berdasarkan ID
const getArticleById = async (id) => {
  const query = 'SELECT * FROM articles WHERE id = $1';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createArticle,
  updateArticle,
  deleteArticle,
  getAllArticles,
  getArticleById,
};

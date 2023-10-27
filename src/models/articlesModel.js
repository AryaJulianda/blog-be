const pool = require('../config/db');

exports.createArticle = async (user_id, title, content, img) => {
  const query = 'INSERT INTO articles (title, content, user_id, img) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [title, content, user_id, img];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

exports.updateArticle = async (id, user_id, title, content, img) => {
  let query;
  let values;

  if (img !== undefined) {
    query = 'UPDATE articles SET title = $2, content = $3, img = $4 WHERE id = $1 RETURNING *';
    values = [id, title, content, img];
  } else {
    query = 'UPDATE articles SET title = $2, content = $3 WHERE id = $1 RETURNING *';
    values = [id, title, content];
  }

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

exports.deleteArticle = async (id,user_id) => {
  const query = 'DELETE FROM articles WHERE id = $1 AND user_id = $2 RETURNING *';
  const values = [id,user_id];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]
  } catch (error) {
    throw error;
  }
};

exports.getAllArticles = async () => {
  const query = `
  SELECT articles.*, 
  users.username AS author_name
  FROM articles
  INNER JOIN users ON articles.user_id = users.user_id
`;

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

exports.getAllArticlesByUserId = async (user_id) => {
  const query = `
    SELECT articles.*, 
    users.username AS author_name
    FROM articles
    INNER JOIN users ON articles.user_id = users.user_id
    WHERE articles.user_id = $1
  `;

  try {
    const result = await pool.query(query,[user_id]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

exports.getArticleById = async (id) => {
  const query = `
  SELECT articles.*, 
  users.username AS author_name
  FROM articles
  INNER JOIN users ON articles.user_id = users.user_id
  WHERE articles.id = $1
`;

  try {
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};
const articlesModel = require('../models/articlesModel');

// Create a new article
exports.create = async (req, res) => {
  const { title, content } = req.body; 
  const user_id = req.userId;
  
  if (!title || !content ) {
    return res.status(400).json({ message: "data required" });
  }
  
  let img;
  if (req.file && req.file.path) {
    img = req.file.path;
  }

  try {
    const article = await articlesModel.createArticle(user_id, title, content, img);
    res.json(article);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the article.",
    });
  }
};

// Update an article by ID
exports.update = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const user_id = req.userId;
  let img ;
  if (req.file && req.file.path) {
    img = req.file.path;
  }

  if (!title || !content ) {
    return res.status(400).json({ message: "data required" });
  }

  try {
    const article = await articlesModel.updateArticle(id, user_id ,title, content, img);
    res.json(article);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating the article.",
    });
  }
};

// Delete an article by ID
exports.remove = async (req, res) => {
  const id = parseInt(req.params.id);
  const user_id = req.userId;
  try {
    const article = await articlesModel.deleteArticle(id,user_id);
    res.json({ message: "Article was deleted successfully!" ,data:article});
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while deleting the article.",
    });
  }
};

// Get all articles
exports.findAll = async (req, res) => {
  try {
    const articles = await articlesModel.getAllArticles();
    res.json(articles);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving articles.",
    });
  }
};

// Get all articles by user id
exports.findMine = async (req, res) => {
  const user_id = req.userId;
  try {
    const articles = await articlesModel.getAllArticlesByUserId(user_id);
    res.json(articles);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving articles.",
    });
  }
};

// Find a single article by ID
exports.findOne = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const article = await articlesModel.getArticleById(id);
    res.json(article);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving the article.",
    });
  }
};


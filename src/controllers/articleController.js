const articleModel = require('../models/articlesModel');

// Create a new article
const create = async (req, res) => {
  const { title, content, author_name } = req.body;

  if (!title || !content || !author_name) {
    return res.status(400).json({ message: "data required" });
  }
  
  let img;
  if (req.file && req.file.path) {
    img = req.file.path;
  }

  try {
    const article = await articleModel.createArticle(title, content, author_name, img);
    res.json(article);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the article.",
    });
  }
};

// Update an article by ID
const update = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, author_name } = req.body;
  let img ;
  if (req.file && req.file.path) {
    img = req.file.path;
  }

  try {
    const article = await articleModel.updateArticle(id, title, content, author_name, img);
    res.json(article);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating the article.",
    });
  }
};

// Delete an article by ID
const remove = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await articleModel.deleteArticle(id);
    res.json({ message: "Article was deleted successfully!" });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while deleting the article.",
    });
  }
};

// Get all articles
const findAll = async (req, res) => {
  try {
    const articles = await articleModel.getAllArticles();
    res.json(articles);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving articles.",
    });
  }
};

// Find a single article by ID
const findOne = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const article = await articleModel.getArticleById(id);
    res.json(article);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving the article.",
    });
  }
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
};


// const { PrismaClient } = require("../../prisma/src/db/client");
// const prisma = new PrismaClient();

// // Create a new article
// const create = async (req, res) => {
//   const { title, content, authorName } = req.body;
//   const date = new Date(); 

//   if (!title || !content || !authorName) { return res.status(400).json({ message: "data required" });}
  
//   let img ;
//   if (req.file && req.file.path) {img = req.file.path}

//   try {
//     const article = await prisma.article.create({
//       data: {
//         title, 
//         content,
//         date, 
//         img,
//         authorName,
//       },
//     });
//     res.json(article);
//   } catch (error) {
//     res.status(500).send({
//       message: error.message || "Some error occurred while creating the article.",
//     });
//   }
// };

// // Update an article by ID
// const update = async (req, res) => {
//   const id = parseInt(req.params.id);
//   const { title, content, authorName } = req.body;
//   let img ;
//   if (req.file && req.file.path) {img = req.file.path}

//   const article = await prisma.article.update({
//     where: { id },
//     data: { title, content, authorName, img },
//   });
//   res.json(article);
// };


// // Delete an article by ID
// const remove = async (req, res) => {
//   const id = parseInt(req.params.id);
//   await prisma.article.delete({
//     where: { id },
//   });
//   res.json({ message: "Article was deleted successfully!" });
// };

// // get all articles
// const findAll = async (req, res) => {
//   const articles = await prisma.article.findMany();
//   res.json(articles);
// };

// // Find a single article by ID
// const findOne = async (req, res) => {
//   const id = parseInt(req.params.id);
//   const article = await prisma.article.findUnique({
//     where: { id },
//   });
//   res.json(article);
// };

// module.exports = {
//   create,
//   findAll,
//   findOne,
//   update,
//   remove,
// };

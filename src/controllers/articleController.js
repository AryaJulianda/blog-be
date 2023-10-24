const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new article
const create = async (req, res) => {
  const { title, content, authorName } = req.body;
  const date = new Date(); 

  if (!title || !content || !authorName) { return res.status(400).json({ message: "data required" });}
  
  let img ;
  if (req.file && req.file.path) {img = req.file.path}

  try {
    const article = await prisma.article.create({
      data: {
        title, 
        content,
        date, 
        img,
        authorName,
      },
    });
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
  const { title, content, authorName } = req.body;
  let img ;
  if (req.file && req.file.path) {img = req.file.path}

  const article = await prisma.article.update({
    where: { id },
    data: { title, content, authorName, img },
  });
  res.json(article);
};


// Delete an article by ID
const remove = async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.article.delete({
    where: { id },
  });
  res.json({ message: "Article was deleted successfully!" });
};

// get all articles
const findAll = async (req, res) => {
  const articles = await prisma.article.findMany();
  res.json(articles);
};

// Find a single article by ID
const findOne = async (req, res) => {
  const id = parseInt(req.params.id);
  const article = await prisma.article.findUnique({
    where: { id },
  });
  res.json(article);
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
};

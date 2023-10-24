module.exports = (app) => {
  const articles = require("../controllers/articleController");
  const upload = require('../middleware/uploadImage')
  const router = require("express").Router();

  router.post("/", upload.single('img'), articles.create);
  router.put("/:id", upload.single('img'), articles.update);
  router.delete("/:id", articles.remove);
  router.get("/", articles.findAll);
  router.get("/:id", articles.findOne);

  app.use("/api/articles", router);
};

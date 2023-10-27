const articlesController = require("../controllers/articlesController");
const {tokenVerification} = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadImage')
const router = require("express").Router();

router.post("/",tokenVerification ,upload.single('img'), articlesController.create);
router.put("/:id",tokenVerification ,upload.single('img'), articlesController.update);
router.delete("/:id",tokenVerification, articlesController.remove);

router.get("/mine", tokenVerification ,articlesController.findMine);
router.get("/", articlesController.findAll);
router.get("/:id", articlesController.findOne);

module.exports = router;

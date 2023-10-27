const app = require('express');

const router = app.Router();
const article = require('./articlesRouter');
const auth = require('./authRouter');

router.use('/api/auth',auth)
router.use('/api/articles',article)

module.exports = router;

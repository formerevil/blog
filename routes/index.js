var express = require('express');
var router = express.Router();
const articleController = require('../controllers/articleController');
const profileController = require('../controllers/profileController');
const userController = require('../controllers/userController');
const commentController = require('../controllers/commentController');
const gameController = require('../controllers/gameController');
const ensureUserAuthenticated = require('../middleware/ensureUserAuth');
const userHasRole = require('../middleware/userHasRole');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/article');
});
router.get('/article/add', ensureUserAuthenticated, userHasRole, articleController.renderAddForm);
router.post('/article/add', ensureUserAuthenticated, userHasRole, articleController.addArticle);

router.get('/article/:articleId', articleController.displayArticle);
router.get('/article/', articleController.displayAll);
router.get('/article/:articleId/edit', ensureUserAuthenticated, userHasRole, articleController.renderEditForm);
router.post('/article/:articleId/edit', ensureUserAuthenticated, userHasRole, articleController.updateArticle);
router.get('/article/:articleId/delete', ensureUserAuthenticated, articleController.deleteArticle);

router.post('/article/:articleId/comment/create', ensureUserAuthenticated, commentController.createComment);
router.post('/comment/:commentId/reply/create', ensureUserAuthenticated, commentController.addReply);
router.get('/comment/:commentId/delete', ensureUserAuthenticated, userHasRole, commentController.deleteComment);
router.get('/comment/:commentId/reply/:replyId/delete', ensureUserAuthenticated, userHasRole, commentController.deleteReply);

router.get('/register', userController.renderRegistrationForm);
router.post('/register', userController.register);

router.get('/login', userController.renderLogin);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

router.get('/user/:userId/edit', userController.renderUpdateForm);
router.post('/user/:userId/update', userController.updateUser);
router.get('/user/:userId/delete', userController.deleteUser);

router.get('/profile/:userId', profileController.displayProfile);
router.get('/profile/:userId/edit', profileController.renderEditForm);
router.post('/profile/:userId/edit', profileController.updateProfile);

router.get('/article/', articleController.viewUserPosts);

router.get('/games/viewAll', gameController.displayAll);
// :3
module.exports = router;

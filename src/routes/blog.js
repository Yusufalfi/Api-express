const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

// import blog controller
const blogController = require('../controllers/blogCtr')
// [POST] http://localhost:4000/v1/blog/post
router.post('/post', 
    body('title')
    .isLength({min: 5})
    .withMessage('input must at least 5 caracter'),
    body('body')
    .isLength({min: 5})
    .withMessage('input must at least 5 caracter'),
    blogController.createBlogpost);

//[GET] get data all
router.get('/posts', blogController.getAllBlogpost);
//[GET] get data by id
router.get('/post/:postId', blogController.getBlogpostById);

//[PUT] update data
router.put('/post/:postId',
    body('title')
    .isLength({min: 5})
    .withMessage('input must at least 5 caracter'),
    body('body')
    .isLength({min: 5})
    .withMessage('input must at least 5 caracter'),
    blogController.updateBlogpost);

// [DELETE] delete data
router.delete('/post/:postId', blogController.deleteBlogpost)

module.exports = router;
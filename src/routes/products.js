const express = require('express');

const router = express.Router();

//controller product
const productController = require('../controllers/productCtr')

// Read == Get//
router.get('/products', productController.getAllProducts)

// Post == Create 
router.post('/product', productController.createProductCtr)

// //put == update
// router.put('/products', (req, res, next) => {
//    res.json({
//     name: "yusuf",
//     product: "keyboard"
//    });
//    next();
// })

// //delete == delete
// router.delete('/products', (req, res, next) => {
//    res.json({
//     name: "yusuf",
//     product: "keyboard"
//    });
//    next();
// })

module.exports = router
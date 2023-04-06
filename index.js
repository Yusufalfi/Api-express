const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const multer  = require('multer');
const path = require('path')


const app = express();
// import routes
// const productRoutes = require('./src/routes/products')
const authRoutes = require('./src/routes/auth')
const blogRoutes = require('./src/routes/blog')

// destination save image
const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => { // destination folder
        callback(null, 'images');
    },
    filename: (req, file, callback) => { //name image + new date
        callback(null, new Date().getTime() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, callback ) => {
    // cek type file image
    if(file.mimetype === 'image/png' ||
       file.mimetype === 'image/jpg' || 
       file.mimetype === 'image/jpeg'){
        callback(null, true);
    } else {
        callback(null, false)
    }
}

// midleware body parse with type json
app.use(bodyParser.json())
// call image
app.use('/images', express.static(path.join(__dirname, 'images')))
// middleware multer
app.use(multer({
    storage: fileStorage, fileFilter: fileFilter
}).single('image'));

// cors http
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, FATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

// app.use('/v1', productRoutes);
app.use('/v1/auth', authRoutes);
app.use('/v1/blog', blogRoutes);

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;


    res.status(status).json({message: message, data: data})
});
// connect mongoose
mongoose.connect('mongodb+srv://yusufalfi91:RR4x4HYk356OKfMJ@cluster0.uajt914.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => {
    app.listen(4000, () => console.log("Connected"));

})
.catch((err => {
    console.log(err)
}));

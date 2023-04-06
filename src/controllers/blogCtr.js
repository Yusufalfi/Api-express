const { validationResult } = require('express-validator');
const BlogPost = require('../models/blogModel');
const path = require('path')
const fs = require('fs')



// create blog controller
exports.createBlogpost = (req, res, next) => {


    // validation
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        const err = new Error('Invalid Value');
        err.errStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if(!req.file) {
        const err = new Error('Image harus di upload');
        err.errStatus = 422;
        throw err;
    }

    const title = req.body.title;
    const body = req.body.body;
    const image = req.file.path;

    const Posting = new BlogPost({
        title: title,
        body: body,
        image: image,
        author: {uid: 1, name: "Yusuf"}
    })

    //  save to db
    Posting.save()
    .then(insert => {
        // response hit api client 
        const results = {
            message: 'Create Blog Success',
            data: insert
        }
        res.status(201).json(results);
    })
    .catch(err => {
        console.log("Error!! data failed to save")
    })

   
}


// get all post
exports.getAllBlogpost = (req, res, next) => {

    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    let totalItems;

    BlogPost.find()
    .countDocuments()
    .then(count => {
        totalItems = count;
       return BlogPost.find()
        .skip((parseInt(currentPage) - 1 ) * parseInt(perPage) )
        .limit(parseInt(perPage))
    }).then(result => {
        res.status(200).json({
            message: 'All Data Blog',
            data: result,
            total_data: totalItems,
            per_page: parseInt(perPage),
            current_page: parseInt(currentPage),
        })
    })
    .catch(err => {
       next(err) 
    })

    // BlogPost.find().then(result => {
    //     res.status(200).json({
    //         message: 'All Data Blog',
    //         data: result
    //     })
    // }).catch(err => {
    //     next(err)
    // })

}

//get data by id
exports.getBlogpostById = (req, res, next) => {
    const postId = req.params.postId
    BlogPost.findById(postId).then(result => {
        if(!result) {
            const error = new Error("Data Not Found")
            error.errStatus = 404;
            throw error
        }
        res.status(200).json({
            message: "Data Blog By Id",
            data: result
        })
    }).catch(err => {
        next(err)
    })
}

// update data 
exports.updateBlogpost = (req,res, next) => {
       // validation
       const errors = validationResult(req);
    //    console.log(errors)
       if (!errors.isEmpty()) {
           const err = new Error('Invalid Value');
           err.errStatus = 400;
           err.data = errors.array();
           throw err;
       }
   
       if(!req.file) {
           const err = new Error('Image harus di upload');
           err.errStatus = 422;
           throw err;
       }
   
       const title = req.body.title;
       const body = req.body.body;
       const image = req.file.path;
   
      const postId = req.params.postId;

      BlogPost.findById(postId).then(post => {
        if(!post){
            const error = new Error("Data Not Found")
            error.errStatus = 404;
            throw error;
        }
        // update
        post.title = title;
        post.body = body;
        post.image = image;

        return post.save();

      }).then(result => {
        //response data to client success
        res.status(200).json({
            message: "update success",
            data: result,
        })
      })
      .catch(err => {
        next(err)
      })
}

//delete data
exports.deleteBlogpost = (req, res, next) => {
    const postId = req.params.postId;

    BlogPost.findById(postId).then(post => {
        if(!post) {
            const error = new Error("Data Not Found")
            error.errStatus = 404;
            throw error
        }

        removeImage(post.image);
        // remove data
        return BlogPost.findByIdAndRemove(postId)
        
    }).then(result => {
        res.status(200).json({
            message : "Delete success",
            data : result,
        })
    })
    .catch(err => {
        next(err);
    })


}

// function delete image
const removeImage = (filePath) => {
    console.log(filePath);
    console.log('dirName', __dirname)

    filePath = path.join(__dirname, '../..', filePath );
    fs.unlink(filePath, err => console.log(err))
}
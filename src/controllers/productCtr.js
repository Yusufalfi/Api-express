exports.createProductCtr = (req, res, next) => {
    // console.log("req", req.body)
    const name = req.body.name;
    const price = req.body.price;

    res.json(
        {
            message: 'create product success',
            data : {
                id: 1,
                neme: name,
                price: price,
            }
        }
    );
    next();
}

exports.getAllProducts = (req, res, next) => {
    res.json({
        
            message: 'create product success',
            data : [
                {
                    id: 1,
                    neme: "keyboard",
                    price: 10000,
                }
            ] 

        
    
    
    });
    next();
 }
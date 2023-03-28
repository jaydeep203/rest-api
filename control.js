const createProduct = (req,res)=>{
    const product = req.body.product;
    const description = req.body.description;
    const price = req.body.price;

    res.json({
        sucess: true,
    });
};

module.exports = createProduct;
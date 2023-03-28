const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const router = require("./UserRoutes");
const cors = require('cors');
const app = express();
app.use(cors());
const port =  4000;

mongoose.connect("mongodb://localhost:27017/sample", {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("connected with mongodb");
}).catch((err)=>{
    console.log(err);
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

const productSchema = new mongoose.Schema({
    product:String,
    description:String,
    price:Number,
});




const Product = new mongoose.model("Product", productSchema);

app.use('api/v1/product', router);

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname+ "/index.html"));
});


app.post("/api/v1/product/new", async(req,res)=>{

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
})

app.get("/api/v1/products", async(req,res)=>{
    const products = await Product.find(req.body);

    res.status(200).json({
        success:true,
        products
    })
})

app.put("/api/v1/product/:id", async(req, res)=>{
    let product = await Product.findById(req.params.id);

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        useFindAndModify:false,
        runValidators:true
    });

    res.status(200).json({
        success:true,
        product
    })

})

app.delete("/api/v1/product/:id", async(req, res)=>{
    let producti = await Product.findById(req.params.id);

    if(!producti)
    {
        return res.status(500).json({
            success:false,
            message: "product not found."
        })
    }

    await producti.deleteOne();

    res.status(200).json({
        success:true,
        message:"product is deleted successfully."
    })
})

app.listen(port, ()=>{
    console.log("app is working on http://localhost:4000");
})
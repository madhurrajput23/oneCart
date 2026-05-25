import uploadOnCloudinary from "../config/cloudinary.js"
import Product from "../model/productModel.js"


export const addProduct = async (req,res) => {
    try {
        let {name,description,price,category,subCategory,sizes,bestseller} = req.body

        let image1 = req.files && req.files.image1 && req.files.image1[0] ? await uploadOnCloudinary(req.files.image1[0].path) : ""
        let image2 = req.files && req.files.image2 && req.files.image2[0] ? await uploadOnCloudinary(req.files.image2[0].path) : ""
        let image3 = req.files && req.files.image3 && req.files.image3[0] ? await uploadOnCloudinary(req.files.image3[0].path) : ""
        let image4 = req.files && req.files.image4 && req.files.image4[0] ? await uploadOnCloudinary(req.files.image4[0].path) : ""
        
        let productData = {
            name,
            description,
            price :Number(price),
            category,
            subCategory,
            sizes :sizes ? JSON.parse(sizes) : [],
            bestseller :bestseller === "true" ? true : false,
            date :Date.now(),
            image1,
            image2,
            image3,
            image4
            
        }

        const product = await Product.create(productData)

        return res.status(201).json(product)

    } catch (error) {
          console.log("AddProduct error", error)
    return res.status(500).json({message:`AddProduct error ${error}`})
    }
    
}


export const listProduct = async (req,res) => {
     
    try {
        const product = await Product.find({});
        return res.status(200).json(product)

    } catch (error) {
        console.log("ListProduct error")
    return res.status(500).json({message:`ListProduct error ${error}`})
    }
}

export const removeProduct = async (req,res) => {
    try {
        let {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
         return res.status(200).json(product)
    } catch (error) {
        console.log("RemoveProduct error")
    return res.status(500).json({message:`RemoveProduct error ${error}`})
    }
    
}

export const updateProduct = async (req,res) => {
    try {
        let {id} = req.params;
        let {name,description,price,category,subCategory,sizes,bestseller} = req.body

        let updateData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: sizes ? JSON.parse(sizes) : [],
            bestseller: bestseller === "true" ? true : false,
        }

        if (req.files) {
            if (req.files.image1 && req.files.image1[0]) updateData.image1 = await uploadOnCloudinary(req.files.image1[0].path);
            if (req.files.image2 && req.files.image2[0]) updateData.image2 = await uploadOnCloudinary(req.files.image2[0].path);
            if (req.files.image3 && req.files.image3[0]) updateData.image3 = await uploadOnCloudinary(req.files.image3[0].path);
            if (req.files.image4 && req.files.image4[0]) updateData.image4 = await uploadOnCloudinary(req.files.image4[0].path);
        }

        const product = await Product.findByIdAndUpdate(id, updateData, { new: true })
        
        if (!product) {
            return res.status(404).json({message: "Product not found"})
        }

        return res.status(200).json(product)
    } catch (error) {
        console.log("UpdateProduct error", error)
        return res.status(500).json({message: `UpdateProduct error ${error}`})
    }
}

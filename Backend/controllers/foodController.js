import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
    try {
        // Log file and body data for debugging
        console.log("File:", req.file);
        console.log("Body:", req.body);

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        const image_filename = `${req.file.filename}`;
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename,
        });

        await food.save();
        res.json({ success: true, message: "Food added" });
    } catch (error) {
        console.error("Error saving food:", error.message);
        res.status(500).json({ success: false, message: "Error", error: error.message });
    }
};

//List food items
const listFood=async(req,res)=>{
    try {
        const list= await foodModel.find({});
        res.json({success:true, data:list})
    } catch (error) {
        console.log(error);
        res.json({success:false,error:error.message})

    }
}

//remove food item
const removeFood = async (req, res) => {
    try {
        // Fetch the food item and delete it
        console.log(req)
        const food = await foodModel.findByIdAndDelete(req.body.id);
        
        // If food item is not found
        if (!food) {
            return res.json({ success: false, message: "Food item not found" });
        }

        // If food item exists, delete the image file
        const filePath = `uploads/${food.image}`;
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting file:", err.message);
            } else {
                console.log("File deleted from uploads");
            }
        });

        // Send success response
        res.json({ success: true, message: "Food item deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export { addFood ,listFood,removeFood};

const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = "mongodb+srv://arbinniroula21:Password@cluster0.x3xb3.mongodb.net/govern";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected successfully");

        const foodItemsCollection = mongoose.connection.db.collection("food_items");
        const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");

        // Fetch food items
        const foodItems = await foodItemsCollection.find({}).toArray();
        
        // Fetch food categories
        const foodCategories = await foodCategoryCollection.find({}).toArray();

        // Store in global variables (if necessary, but consider returning)
        global.food_items = foodItems;
        global.foodCategory = foodCategories;

        // Log data for confirmation
        console.log("Fetched food items:", global.food_items);
        console.log("Fetched food categories:", global.foodCategory);

    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

module.exports = mongoDB;

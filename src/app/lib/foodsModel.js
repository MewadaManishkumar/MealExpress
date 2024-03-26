const { default: mongoose } = require("mongoose");

const foodModel = new mongoose.Schema({
    name:String,
    price:Number,
    image_path:String,
    description:String,
    resto_id:mongoose.Types.ObjectId //connecting to the restaurant model 
});

export const foodSchema =
  mongoose.models.foods || mongoose.model("foods", foodModel);
import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

//get perticular food item by its id to populate data in edit form 
export async function GET(request, content) {
  const id = content.params.id;
  let success = false;
  await mongoose.connect(connectionStr);
  const data = await foodSchema.findOne({ _id: id });
  if (data) {
    success = true;
  }
  return NextResponse.json({ data, success });
}

//Put api to update the food items details
export async function PUT(request, content) {
  const id = content.params.id;
  const payload = await request.json();
  try {
    await mongoose.connect(connectionStr);
    // Find the food item by id and update it with new data
    const updatedFoodItem = await foodSchema.findByIdAndUpdate({ _id: id }, payload,{ new: true });
    if (!updatedFoodItem) {
      return NextResponse.json(
        { success: false, message: "Food item not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: updatedFoodItem });
  } catch (error) {
    console.error("Error updating food item:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update food item" },
      { status: 500 }
    );
  } finally {
    await mongoose.disconnect();
  }
}

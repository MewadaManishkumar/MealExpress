import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// get all food items data by restaurant id(resto_id)
export async function GET(request, content) {
  const id = content.params.id;
  let success = false;
  await mongoose.connect(connectionStr);
  const data = await foodSchema.find({ resto_id: id });
  if (data) {
    success = true;
  }
  return NextResponse.json({ data, success });
}

// delete a food item by its _id
export async function DELETE(request, content) {
  const id = content.params.id;

  try {
    await mongoose.connect(connectionStr);
    // Find the food item by id
    const foodItem = await foodSchema.findOneAndDelete({ _id: id });
    if (!foodItem) {
      return NextResponse.json({ success: false, message: 'Food item not found' }, { status: 404 });
    }
    // Fetch the updated list of food items
    const resto_id = foodItem.resto_id;
    const updatedData = await foodSchema.find({ resto_id });
    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    console.error('Error deleting food item:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete food item' }, { status: 500 });
  } finally {
    await mongoose.disconnect();
  }
}
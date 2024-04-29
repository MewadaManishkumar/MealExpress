import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Post api to create New food item data and save from add food item form
export async function POST(request){
    const payload  = await request.json();
    let success = false;
    await mongoose.connect(connectionStr);
    const food = new foodSchema(payload);
    const result = await food.save();
    if(result){
        success = true;
    }
    return NextResponse.json({result, success})
}
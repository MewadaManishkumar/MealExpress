import { connectionStr } from "@/app/lib/db";
import { userSchema } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json();
    let success = false;
    await mongoose.connect(connectionStr);
    const user= new userSchema(payload);
    const result = await user.save()
    if(result){
        success=true
    }
    return NextResponse.json({result,success})
}
import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

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

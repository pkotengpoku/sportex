import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
export async function POST(request) {
  try {
    await dbConnect()
    const { name, email } = await request.json();
    const newUser = new User({ name, email });
    await newUser.save();
    return NextResponse.json(newUser, {status: 201})
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, error: error.message },{status: 400});
  }
} 
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(request){
    try {
        await dbConnect()
        const productData = await request.json();
        const newProduct = new Product(productData);
        await newProduct.save();
        console.log(newProduct)
        return NextResponse.json(newProduct, {status: 201})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, error: error.message },{status: 400});
    }
}

export async function GET() {
    try {
      await dbConnect();
      const products = await Product.find({});
      return NextResponse.json(products);
    } catch (error) {
      return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
  }
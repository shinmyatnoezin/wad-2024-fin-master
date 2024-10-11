import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db'; // Ensure the database connection utility is imported
import Product from '@/models/Product'; // Adjust the path based on your project structure

// Establish database connection before processing requests
await dbConnect();

// GET: Fetch a product by ID and populate its category
export async function GET(request, { params }) {
  try {
    const id = params.id; // Extract product ID from the params
    const product = await Product.findById(id).populate("category"); // Find product by ID and populate category
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 }); // Return the found product
  } catch (error) {
    return NextResponse.json({ message: "Error fetching product", error: error.message }, { status: 500 });
  }
}

// DELETE: Delete a product by ID
export async function DELETE(request, { params }) {
  try {
    const id = params.id; // Extract product ID from the params
    const product = await Product.findByIdAndDelete(id); // Find and delete the product by ID
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 }); // Return success message
  } catch (error) {
    return NextResponse.json({ message: "Error deleting product", error: error.message }, { status: 500 });
  }
}

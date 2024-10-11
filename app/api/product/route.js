import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db'; // Adjust the path based on your project structure
import Product from '@/models/Product'; // Adjust the path to your Product model

// Ensure the database connection is established
await dbConnect();

// GET: Fetch all products
export async function GET() {
    try {
        const products = await Product.find(); // Fetch all products from the database
        return NextResponse.json(products); // Return the response in JSON format
    } catch (error) {
        return NextResponse.json({ message: "Error fetching products", error: error.message }, { status: 500 });
    }
}

// POST: Create a new product
export async function POST(request) {
    try {
        const body = await request.json(); // Parse the incoming request body
        console.log(body); // Log the request body for debugging
        const product = new Product(body); // Create a new Product instance
        await product.save(); // Save the product to the database
        return NextResponse.json(product, { status: 201 }); // Return the created product
    } catch (error) {
        return NextResponse.json({ message: "Error creating product", error: error.message }, { status: 500 });
    }
}

// PUT: Update an existing product (full update)
export async function PUT(request) {
    try {
        const body = await request.json(); // Parse the incoming request body
        const { _id, ...updateData } = body; // Extract _id and other update fields
        const product = await Product.findByIdAndUpdate(_id, updateData, { new: true }); // Find and update the product
        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
        return NextResponse.json(product, { status: 200 }); // Return the updated product
    } catch (error) {
        return NextResponse.json({ message: "Error updating product", error: error.message }, { status: 500 });
    }
}

// PATCH: Partially update an existing product
export async function PATCH(request) {
    try {
        const body = await request.json(); // Parse the incoming request body
        const { _id, ...updateData } = body; // Extract _id and partial update data
        const product = await Product.findByIdAndUpdate(_id, updateData, { new: true }); // Find and update the product
        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
        return NextResponse.json(product, { status: 200 }); // Return the partially updated product
    } catch (error) {
        return NextResponse.json({ message: "Error partially updating product", error: error.message }, { status: 500 });
    }
}

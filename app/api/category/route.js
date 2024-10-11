import Category from "@/models/Category";
import { NextResponse } from "next/server";

// GET: Fetch all categories
export async function GET() {
  try {
    const categories = await Category.find().sort({ order: -1 }); // Sort categories by order in descending order
    return NextResponse.json(categories); // Return categories as JSON
  } catch (error) {
    return NextResponse.json({ message: "Error fetching categories", error: error.message }, { status: 500 });
  }
}

// POST: Create a new category
export async function POST(request) {
  try {
    const body = await request.json(); // Parse the incoming request body
    const category = new Category(body); // Create a new Category instance
    await category.save(); // Save the category to the database
    return NextResponse.json(category, { status: 201 }); // Return the created category with status 201
  } catch (error) {
    return NextResponse.json({ message: "Error creating category", error: error.message }, { status: 500 });
  }
}

// PUT: Update an existing category
export async function PUT(request) {
  try {
    const body = await request.json(); // Parse the incoming request body
    const category = await Category.findByIdAndUpdate(body._id, body, { new: true }); // Update and return the updated category
    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 }); // Handle case where category does not exist
    }
    return NextResponse.json(category); // Return the updated category
  } catch (error) {
    return NextResponse.json({ message: "Error updating category", error: error.message }, { status: 500 });
  }
}

// DELETE: Remove a category by _id
export async function DELETE(request) {
  try {
    const body = await request.json(); // Parse the incoming request body
    const category = await Category.findByIdAndDelete(body._id); // Find and delete the category
    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 }); // Handle case where category does not exist
    }
    return NextResponse.json({ message: "Category successfully deleted" }, { status: 200 }); // Return success message
  } catch (error) {
    return NextResponse.json({ message: "Error deleting category", error: error.message }, { status: 500 });
  }
}

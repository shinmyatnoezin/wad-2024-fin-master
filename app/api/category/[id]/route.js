import Category from "@/models/Category";
import { NextResponse } from "next/server";

// GET: Fetch a category by ID
export async function GET(request, { params }) {
    const id = params.id;

    try {
        const category = await Category.findById(id);
        if (!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }
        return NextResponse.json(category); // Return the category found
    } catch (error) {
        return NextResponse.json({ message: "Error fetching category", error: error.message }, { status: 500 });
    }
}

// DELETE: Remove a category by ID
export async function DELETE(request, { params }) {
    const id = params.id;

    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Category successfully deleted", category }); // Return success message with deleted category
    } catch (error) {
        return NextResponse.json({ message: "Error deleting category", error: error.message }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db'; // Adjust the path based on your project structure
import Customer from '@/models/Customer'; // Adjust the path to your Customer model

// GET: Fetch all customers
export async function GET(request) {
    await dbConnect(); // Ensure the database connection is established
    try {
        const customers = await Customer.find(); // Fetch all customers from the database
        return NextResponse.json(customers); // Return the response in JSON format
    } catch (error) {
        return NextResponse.json({ message: "Error fetching customers", error: error.message }, { status: 500 });
    }
}

// POST: Create a new customer
export async function POST(request) {
    await dbConnect(); // Ensure the database connection is established
    try {
        const body = await request.json(); // Parse the incoming request body
        const customer = new Customer(body); // Create a new Customer instance
        await customer.save(); // Save the customer to the database
        return NextResponse.json(customer, { status: 201 }); // Return the created customer
    } catch (error) {
        return NextResponse.json({ message: "Error creating customer", error: error.message }, { status: 500 });
    }
}

// PUT: Update an existing customer (full update)
export async function PUT(request) {
    await dbConnect(); // Ensure the database connection is established
    try {
        const body = await request.json(); // Parse the incoming request body
        const { _id, ...updateData } = body; // Extract _id and other update fields
        const customer = await Customer.findByIdAndUpdate(_id, updateData, { new: true }); // Find and update the customer
        if (!customer) {
            return NextResponse.json({ message: "Customer not found" }, { status: 404 });
        }
        return NextResponse.json(customer, { status: 200 }); // Return the updated customer
    } catch (error) {
        return NextResponse.json({ message: "Error updating customer", error: error.message }, { status: 500 });
    }
}

// PATCH: Partially update an existing customer
export async function PATCH(request) {
    await dbConnect(); // Ensure the database connection is established
    try {
        const body = await request.json(); // Parse the incoming request body
        const { _id, ...updateData } = body; // Extract _id and partial update data
        const customer = await Customer.findByIdAndUpdate(_id, updateData, { new: true }); // Find and update the customer
        if (!customer) {
            return NextResponse.json({ message: "Customer not found" }, { status: 404 });
        }
        return NextResponse.json(customer, { status: 200 }); // Return the partially updated customer
    } catch (error) {
        return NextResponse.json({ message: "Error partially updating customer", error: error.message }, { status: 500 });
    }
}

// DELETE: Remove a customer by _id
export async function DELETE(request) {
    await dbConnect(); // Ensure the database connection is established
    try {
        const body = await request.json(); // Parse the incoming request body
        const { _id } = body; // Extract _id from request body
        const customer = await Customer.findByIdAndDelete(_id); // Find and delete the customer
        if (!customer) {
            return NextResponse.json({ message: "Customer not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Customer successfully deleted", customer }, { status: 200 }); // Return success message
    } catch (error) {
        return NextResponse.json({ message: "Error deleting customer", error: error.message }, { status: 500 });
    }
}

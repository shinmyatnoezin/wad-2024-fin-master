"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function CustomerPage() {
  const APIBASE = process.env.NEXT_PUBLIC_API_URL;
  const [customers, setCustomers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  async function fetchCustomers() {
    const response = await fetch(`${APIBASE}/customer`);
    const data = await response.json();
    setCustomers(data);
  }

  const handleCustomerSubmit = async (data) => {
    const method = editMode ? "PUT" : "POST"; // Use PUT for updates
    const url = editMode ? `${APIBASE}/customer` : `${APIBASE}/customer`;

    // If in edit mode, you might want to include the ID in the URL
    if (editMode) {
      data.id = data._id; // Get the ID from the data
    }

    // Add error handling
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      reset(); // Reset the form
      setEditMode(false); // Exit edit mode
      fetchCustomers(); // Refresh the customer list
    } else {
      alert("Failed to save customer");
    }
  };

  const startEdit = (customer) => () => {
    setEditMode(true);
    reset(customer); // Pre-fill the form with the customer data
  };

  const deleteCustomer = (id) => async () => {
    if (confirm("Are you sure you want to delete this customer?")) {
      await fetch(`${APIBASE}/customer/${id}`, {
        method: "DELETE",
      });
      fetchCustomers(); // Refresh the customer list after deletion
    }
  };

  useEffect(() => {
    fetchCustomers(); // Fetch customers on initial load
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Customer Management</h1>
      <form onSubmit={handleSubmit(handleCustomerSubmit)} className="my-4">
        <input
          {...register("name", { required: true })}
          placeholder="Name"
          className="border p-2 mb-2 w-full"
        />
        <input
          {...register("dateOfBirth", { required: true })}
          type="date"
          className="border p-2 mb-2 w-full"
        />
        <input
          {...register("memberNumber", { required: true })}
          type="number"
          placeholder="Member Number"
          className="border p-2 mb-2 w-full"
        />
        <input
          {...register("interests")}
          placeholder="Interests (comma-separated)"
          className="border p-2 mb-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          {editMode ? "Update Customer" : "Add Customer"}
        </button>
        {editMode && (
          <button
            type="button"
            onClick={() => {
              reset(); // Clear the form
              setEditMode(false); // Exit edit mode
            }}
            className="bg-gray-500 text-white p-2 ml-2"
          >
            Cancel
          </button>
        )}
      </form>

      <ul>
        {customers.map((customer) => (
          <li key={customer._id} className="flex justify-between items-center border-b py-2">
            <span>
              {customer.name} - {new Date(customer.dateOfBirth).toLocaleDateString()} - {customer.memberNumber}
            </span>
            <div>
              <button onClick={startEdit(customer)} className="mr-2 text-blue-600">Edit</button>
              <button onClick={deleteCustomer(customer._id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

"use client";
import * as React from "react";
import { useEffect, useState } from "react";

export default function HomeV2() {
  const APIBASE = process.env.NEXT_PUBLIC_API_URL; // Your API base URL
  const [customers, setCustomers] = useState([]); // State to hold customer data

  // Function to fetch customer data
  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${APIBASE}/customer`); // Fetch customer data
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCustomers(data); // Set the customer data in state
    } catch (error) {
      console.error("Failed to fetch customers:", error); // Log any errors
    }
  };

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <main>
      <div className="w-full h-full my-10 mx-10">
        <h1 className="font-bold text-xl">Stock App</h1>
        <p>Simple stock management</p>
        <h2 className="mt-4 font-bold text-lg">Customer Information</h2>
        <ul>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <li key={customer._id} className="my-2 p-2 border border-gray-300 rounded">
                <p className="font-semibold">{customer.name}</p>
                <p>Date of Birth: {new Date(customer.dateOfBirth).toLocaleDateString()}</p>
                <p>Member Number: {customer.memberNumber}</p>
                <p>Interests: {customer.interests.join(", ") || "None"}</p>
              </li>
            ))
          ) : (
            <p>No customers found.</p> // Message if no customers are found
          )}
        </ul>
      </div>
    </main>
  );
}

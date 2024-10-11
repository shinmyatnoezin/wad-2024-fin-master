"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function Home() {
  const APIBASE = process.env.NEXT_PUBLIC_API_URL;
  const [categoryList, setCategoryList] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  async function fetchCategory() {
    try {
      const response = await fetch(`${APIBASE}/category`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      const formattedData = data.map((category) => {
        category.id = category._id; // Ensure we have a consistent ID
        return category;
      });
      setCategoryList(formattedData);
    } catch (error) {
      console.error(error);
    }
  }

  const startEdit = (category) => async () => {
    setEditMode(true);
    reset(category); // Populate the form with the selected category's data
  }

  const deleteById = (id) => async () => {
    if (!confirm("Are you sure?")) return;

    try {
      await fetch(`${APIBASE}/category/${id}`, {
        method: "DELETE",
      });
      fetchCategory(); // Refresh the category list after deletion
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  }

  useEffect(() => {
    fetchCategory(); // Fetch categories on component mount
  }, []);

  function handleCategoryFormSubmit(data) {
    const method = editMode ? "PUT" : "POST"; // Determine method based on edit mode
    const url = editMode ? `${APIBASE}/category` : `${APIBASE}/category`;

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        reset({ name: '', order: '' }); // Reset form after submission
        setEditMode(false); // Exit edit mode
        fetchCategory(); // Refresh the category list
      })
      .catch((error) => console.error('Failed to save category:', error));
  }

  return (
    <main>
      <div className="flex flex-row gap-4">
        <div className="flex-1 w-64">
          <form onSubmit={handleSubmit(handleCategoryFormSubmit)}>
            <div className="grid grid-cols-2 gap-4 w-fit m-4">
              <div>Category:</div>
              <div>
                <input
                  name="name"
                  type="text"
                  {...register("name", { required: true })}
                  className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div>Order:</div>
              <div>
                <input
                  name="order"
                  type="number"
                  {...register("order", { required: true, valueAsNumber: true, min: 0 })}
                  className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div className="col-span-2 text-right">
                <input
                  type="submit"
                  value={editMode ? "Update" : "Add"} // Toggle button label based on edit mode
                  className={`bg-${editMode ? "blue" : "green"}-800 hover:bg-${editMode ? "blue" : "green"}-700 text-white font-bold py-2 px-4 rounded-full`}
                />
                {editMode && (
                  <button
                    type="button"
                    onClick={() => {
                      reset({ name: '', order: '' });
                      setEditMode(false);
                    }}
                    className="ml-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="border m-4 bg-slate-300 flex-1 w-64">
          <ul>
            {categoryList.map((c) =>
              <li key={c._id} className="flex items-center justify-between">
                <div>
                  <button className="border border-black p-1" onClick={startEdit(c)}>📝</button>
                  <button className="border border-black p-1" onClick={deleteById(c._id)}>❌</button>
                  <Link href={`/category/${c._id}`} className="ml-2">{c.name}</Link> [{c.order}]
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}

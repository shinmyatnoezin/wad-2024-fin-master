// This component fetches and displays a single product based on the ID in the URL parameters
export default async function Home({ params }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  try {
    // Fetch the product data from the API
    const response = await fetch(`${API_BASE}/product/${params.id}`, { cache: "no-store" });

    // Check if the response is ok (status code 200)
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }

    // Parse the product data
    const product = await response.json();

    // Log the product data for debugging
    console.log({ product, category: product.category });

    // Render the product details
    return (
      <div className="m-4">
        <h1 className="text-2xl font-bold">Product Details</h1>
        <p className="font-bold text-xl text-blue-800">{product.name}</p>
        <p>{product.description}</p>
        <p className="font-semibold">Price: {product.price} Baht</p>
        {product.category && (
          <p className="font-semibold">Category: {product.category.name}</p>
        )}
      </div>
    );
  } catch (error) {
    // Handle errors (e.g., network issues, data not found)
    console.error(error);
    return (
      <div className="m-4">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="text-red-800">Failed to load product details. Please try again later.</p>
      </div>
    );
  }
}

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function CustomerDetail() {
  const router = useRouter();
  const { id } = router.query; // Get customer ID from the URL
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchCustomer = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/${id}`); // Adjust API URL
          if (!response.ok) {
            throw new Error('Failed to fetch customer');
          }
          const data = await response.json();
          setCustomer(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchCustomer();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>; // Loading state
  if (error) return <p>Error: {error}</p>; // Error handling
  if (!customer) return <p>No customer found.</p>; // Handle case with no customer data

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold">{customer.name}</h1>
      <p><strong>Date of Birth:</strong> {new Date(customer.dateOfBirth).toLocaleDateString()}</p>
      <p><strong>Member Number:</strong> {customer.memberNumber}</p>
      <p><strong>Interests:</strong> {customer.interests.join(', ') || 'None'}</p>
      <button onClick={() => router.back()} className="mt-4 p-2 bg-blue-500 text-white rounded">Back</button>
    </div>
  );
}

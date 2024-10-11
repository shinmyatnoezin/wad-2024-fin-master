import Customer from '../../../../models/Customer'; // Adjust the path according to your folder structure
import dbConnect from '../../../../lib/dbConnect'; // Adjust the path if needed

export default async function handler(req, res) {
  await dbConnect(); // Ensure you're connected to your MongoDB

  const { id } = req.query; // Get the customer ID from the request parameters

  switch (req.method) {
    case 'GET':
      return getCustomerById(req, res, id);
    default:
      res.setHeader('Allow', ['GET']); // Allow only GET method
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const getCustomerById = async (req, res, id) => {
  try {
    const customer = await Customer.findById(id); // Fetch customer from the database
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' }); // If customer not found
    }
    res.status(200).json(customer); // Return customer details
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customer' }); // Handle errors
  }
}

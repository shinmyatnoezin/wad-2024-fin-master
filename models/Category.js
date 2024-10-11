import mongoose from 'mongoose';

// Define the category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is a required field
    trim: true, // Trim whitespace from the beginning and end
  },
  order: {
    type: Number,
    default: 0, // Default order to 0 if not specified
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create the Category model, using uppercase for model name
const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;

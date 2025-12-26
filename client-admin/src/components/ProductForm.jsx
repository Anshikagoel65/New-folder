import { useState } from "react";
import { addProduct } from "../api/productApi";

const ProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting product:", form); // 👈 DEBUG

    try {
      const result = await addProduct({
        name: form.name,
        price: Number(form.price),
        quantity: Number(form.quantity),
        category: form.category,
      });

      console.log("API response:", result); // 👈 DEBUG
      alert("Product added successfully");

      setForm({ name: "", price: "", quantity: "", category: "" });
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="name"
        placeholder="Product Name"
        onChange={handleChange}
        value={form.name}
      />
      <input
        name="price"
        placeholder="Price"
        onChange={handleChange}
        value={form.price}
      />
      <input
        name="quantity"
        placeholder="Quantity"
        onChange={handleChange}
        value={form.quantity}
      />
      <input
        name="category"
        placeholder="Category"
        onChange={handleChange}
        value={form.category}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;

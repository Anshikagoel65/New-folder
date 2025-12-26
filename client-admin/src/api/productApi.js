export const addProduct = async (product) => {
  const res = await fetch("api/admin/product", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    throw new Error("Failed to add product");
  }
  return res.json();
};

export const updateProduct = async (id, product) => {
  const res = await fetch(`api/admin/product/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
};

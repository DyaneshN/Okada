// src/api/api.js

const API_BASE = "http://localhost:8000/api/properties"; // Change if your backend runs elsewhere

// Fetch all properties
export async function getProperties() {
  const res = await fetch(`${API_BASE}/`);
  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
}

// Create a new property
export async function createProperty(property) {
  const res = await fetch(`${API_BASE}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(property),
  });
  if (!res.ok) throw new Error("Failed to create property");
  return res.json();
}

// Update a property
export async function updateProperty(id, property) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(property),
  });
  if (!res.ok) throw new Error("Failed to update property");
  return res.json();
}

// Delete a property
export async function deleteProperty(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete property");
  return res.json();
}
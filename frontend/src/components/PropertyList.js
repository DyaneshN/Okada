import React, { useEffect, useState } from "react";
import { getProperties, deleteProperty } from "../api/api";

function PropertyList({ onEdit, onAdd }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const data = await getProperties();
      setProperties(data);
      setError("");
    } catch (err) {
      setError("Failed to load properties");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this property?")) return;
    try {
      await deleteProperty(id);
      fetchProperties();
    } catch {
      setError("Failed to delete property");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h2>Property Listings</h2>
      <button onClick={onAdd}>Add New Property</button>
      <table border="1" cellPadding="8" style={{ width: "100%", marginTop: 10 }}>
  <thead>
    <tr>
      <th>ID</th>
      <th>Address</th>
      <th>Floor</th>
      <th>Suite</th>
      <th>Size</th>
      <th>Rent</th>
      <th>Broker Name</th>
      <th>Broker Email</th>
      <th>Broker Phone</th>
      <th>Annual Rent</th>
      <th>Status</th>
      <th>Landlord Name</th>
      <th>Landlord Email</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {properties.map((prop) => (
      <tr key={prop._id}>
        <td>{prop.id}</td>
        <td>{prop.address}</td>
        <td>{prop.floor}</td>
        <td>{prop.suite}</td>
        <td>{prop.size}</td>
        <td>{prop.rent}</td>
        <td>{prop.broker_name}</td>
        <td>{prop.broker_email}</td>
        <td>{prop.broker_phone}</td>
        <td>{prop.annual_rent}</td>
        <td>{prop.status}</td>
        <td>{prop.landlord_name}</td>
        <td>{prop.landlord_email}</td>
        <td>
          <button onClick={() => onEdit(prop)}>Edit</button>
          <button onClick={() => handleDelete(prop._id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}
//Property List Component (to display properties and show CRUD buttons)
// Features:
// Fetches and displays all properties.
// Shows address, status, rent, annual rent, etc.
// Has buttons for Edit and Delete.
// Has a button to Add New Property.
export default PropertyList;
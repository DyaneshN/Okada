import React, { useState, useEffect } from "react";

const statusOptions = ["available", "leased"]; // Adjust as per your backend enum

function PropertyForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    id: "",
    address: "",
    floor: "",
    suite: "",
    size: "",
    rent: "",
    broker_name: "",
    broker_email: "",
    broker_phone: "",
    annual_rent: "",
    status: "available",
    landlord_name: "",
    landlord_email: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      id: Number(form.id),
      size: Number(form.size),
      rent: Number(form.rent),
      annual_rent: Number(form.annual_rent),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ID: </label>
        <input name="id" type="number" value={form.id} onChange={handleChange} required />
      </div>
      <div>
        <label>Address: </label>
        <input name="address" value={form.address} onChange={handleChange} required />
      </div>
      <div>
        <label>Floor: </label>
        <input name="floor" value={form.floor} onChange={handleChange} />
      </div>
      <div>
        <label>Suite: </label>
        <input name="suite" value={form.suite} onChange={handleChange} />
      </div>
      <div>
        <label>Size: </label>
        <input name="size" type="number" value={form.size} onChange={handleChange} required />
      </div>
      <div>
        <label>Rent: </label>
        <input name="rent" type="number" value={form.rent} onChange={handleChange} required />
      </div>
      <div>
        <label>Broker Name: </label>
        <input name="broker_name" value={form.broker_name} onChange={handleChange} required />
      </div>
      <div>
        <label>Broker Email: </label>
        <input name="broker_email" type="email" value={form.broker_email} onChange={handleChange} required />
      </div>
      <div>
        <label>Broker Phone: </label>
        <input name="broker_phone" value={form.broker_phone} onChange={handleChange} required />
      </div>
      <div>
        <label>Annual Rent: </label>
        <input name="annual_rent" type="number" value={form.annual_rent} onChange={handleChange} required />
      </div>
      <div>
        <label>Status: </label>
        <select name="status" value={form.status} onChange={handleChange} required>
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Landlord Name: </label>
        <input name="landlord_name" value={form.landlord_name} onChange={handleChange} required />
      </div>
      <div>
        <label>Landlord Email: </label>
        <input name="landlord_email" type="email" value={form.landlord_email} onChange={handleChange} required />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>
        Cancel
      </button>
    </form>
  );
}
//Property Form Component (for add/edit actions)
// Features:
// Used for both adding and editing.
// Fields: address, status, rent, annual rent.
// Calls the appropriate API function on submit.
export default PropertyForm;
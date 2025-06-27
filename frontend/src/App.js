import React, { useState } from "react";
import PropertyList from "./components/PropertyList";
import PropertyForm from "./components/PropertyForm";
import { createProperty, updateProperty } from "./api/api";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdd = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleEdit = (property) => {
    setEditData(property);
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editData) {
        await updateProperty(editData._id, formData);
      } else {
        await createProperty(formData);
      }
      setShowForm(false);
      setRefreshKey((k) => k + 1); // Triggers PropertyList to refresh
    } catch (e) {
      alert("Error saving property");
    }
  };

  return (
    <div>
      <h1>Property Listings Dashboard</h1>
      <PropertyList
        key={refreshKey}
        onEdit={handleEdit}
        onAdd={handleAdd}
      />
      {showForm && (
        <PropertyForm
          initialData={editData}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default App;

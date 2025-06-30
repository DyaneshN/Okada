import React, { useState } from "react";
import PropertyList from "./components/PropertyList";
import PropertyForm from "./components/PropertyForm";
import { createProperty, updateProperty } from "./api/api";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

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
      setRefreshKey((k) => k + 1);
    } catch (e) {
      alert("Error saving property");
    }
  };

  return (
    <div>
      <h1>Property Listings Dashboard</h1>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          mt: 3,
          px: 2,
        }}
      >
        <Typography variant="h4">Property Listings</Typography>

        <Button variant="contained" onClick={handleAdd}>
          Add New Property
        </Button>
      </Box>

      <PropertyList key={refreshKey} onEdit={handleEdit} />
      {showForm && (
        <PropertyForm
          open={showForm}
          initialData={editData}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default App;

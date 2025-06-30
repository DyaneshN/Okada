import React, { useEffect, useState } from "react";
import { getProperties, deleteProperty } from "../api/api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { tableheadcell } from "../customcss/PropertyListCSS";

function PropertyList({ onEdit }) {
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
      <TableContainer
        component={Paper}
        elevation={2}
        sx={{ borderRadius: 2, mb: 4 }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={tableheadcell}>ID</TableCell>
              <TableCell sx={tableheadcell}>Address</TableCell>
              <TableCell sx={tableheadcell}>Floor</TableCell>
              <TableCell sx={tableheadcell}>Suite</TableCell>
              <TableCell sx={tableheadcell}>Size</TableCell>
              <TableCell sx={tableheadcell}>Rent</TableCell>
              <TableCell sx={tableheadcell}>Broker Name</TableCell>
              <TableCell sx={tableheadcell}>Broker Email</TableCell>
              <TableCell sx={tableheadcell}>Broker Phone</TableCell>
              <TableCell sx={tableheadcell}>Annual Rent</TableCell>
              <TableCell sx={tableheadcell}>Status</TableCell>
              <TableCell sx={tableheadcell}>Landlord Name</TableCell>
              <TableCell sx={tableheadcell}>Landlord Email</TableCell>
              <TableCell sx={tableheadcell}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties.map((row, index) => (
              <TableRow
                key={row._id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.floor}</TableCell>
                <TableCell>{row.suite}</TableCell>
                <TableCell>{row.size}</TableCell>
                <TableCell>{row.rent}</TableCell>
                <TableCell>{row.broker_name}</TableCell>
                <TableCell>{row.broker_email}</TableCell>
                <TableCell>{row.broker_phone}</TableCell>
                <TableCell>{row.annual_rent}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.landlord_name}</TableCell>
                <TableCell>{row.landlord_email}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => onEdit(row)}
                    >
                      EDIT
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleDelete(row._id)}
                    >
                      DELETE
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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

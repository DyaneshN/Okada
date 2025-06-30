import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

const statusOptions = ["available", "leased"]; // Adjust as per your backend enum

function PropertyForm({ open, initialData, onSubmit, onCancel }) {
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
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidation = () => {
    const requiredFields = [
      "id",
      "address",
      "floor",
      "suite",
      "size",
      "rent",
      "broker_name",
      "broker_email",
      "broker_phone",
      "annual_rent",
      "status",
      "landlord_name",
      "landlord_email",
    ];

    requiredFields.forEach((field) => {
      if (!form[field]?.toString().trim()) {
        return false;
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.broker_email && !emailRegex.test(form.broker_email)) {
      return false;
    }
    if (form.landlord_email && !emailRegex.test(form.landlord_email)) {
      return false;
    }

    const numericFields = ["size", "rent", "annual_rent", "broker_phone"];
    numericFields.forEach((field) => {
      if (form[field] && isNaN(Number(form[field]))) {
        return false;
      }
    });

    return true;
  };

  const handleSubmit = (e) => {
    const isValid = handleValidation();
    console.log(isValid);
    if (isValid) {
      setShowAlert(false);
      e.preventDefault();
      onSubmit({
        ...form,
        id: Number(form.id),
        size: Number(form.size),
        rent: Number(form.rent),
        annual_rent: Number(form.annual_rent),
      });
    } else {
      setShowAlert(true);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onCancel}>
        <DialogTitle>EDIT DETAILS</DialogTitle>
        {showAlert && (
          <Alert severity="error">There are errors in your fields..!</Alert>
        )}
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                variant="filled"
                type="number"
                name="id"
                label="ID"
                value={form.id}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                label="address"
                variant="filled"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="filled"
                label="Floor"
                name="floor"
                value={form.floor}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="filled"
                name="suite"
                label="Suite"
                value={form.suite}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                variant="filled"
                label="Size"
                name="size"
                value={form.size}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                variant="filled"
                label="Rent"
                name="rent"
                type="number"
                value={form.rent}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                variant="filled"
                label="Broker Name"
                name="broker_name"
                value={form.broker_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                variant="filled"
                label="Broker Email"
                name="broker_email"
                value={form.broker_email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="number"
                required
                variant="filled"
                label="Broker Phone"
                name="broker_phone"
                value={form.broker_phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                variant="filled"
                label="Annual Rent"
                name="annual_rent"
                type="number"
                value={form.annual_rent}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="filled">
                <InputLabel id="demo-simple-select-filled-label">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  label="Status"
                  id="demo-simple-select-filled"
                  value={form.status}
                  onChange={handleChange}
                  required
                >
                  {statusOptions.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                variant="filled"
                label="Landlord Name"
                name="landlord_name"
                value={form.landlord_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                variant="filled"
                name="landlord_email"
                label="Landlord Email"
                value={form.landlord_email}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>SAVE</Button>
          <Button onClick={onCancel}>CANCEL</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
//Property Form Component (for add/edit actions)
// Features:
// Used for both adding and editing.
// Fields: address, status, rent, annual rent.
// Calls the appropriate API function on submit.
export default PropertyForm;

import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const Form = () => {
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = {
      name,
      regNo,
      department,
      level,
      phone,
    };

    // Make a POST request to your backend endpoint for Monify integration
    axios
      .post("/api/student/process-payment", formData) // Update the URL with your server's endpoint
      .then((response) => {
        // Handle the response from the backend, if necessary
        const { payment_url } = response.data;
        window.open(payment_url, "_blank").focus();
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          console.error("Response Error:", error.response.data);
          console.error("Response Status:", error.response.status);
          console.error("Response Headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Request Error:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error:", error.message);
        }
      });
  };

  const validateForm = () => {
    setError(null);

    if (!name) {
      setError("Name field is required");
      return false;
    }
    if (!regNo) {
      setError("Registration number field is required");
      return false;
    }
    if (!department) {
      setError("Department field is required");
      return false;
    }
    if (!level) {
      setError("Level field is required");
      return false;
    }
    if (!phone) {
      setError("Phone field is required");
      return false;
    }

    return true;
  };

  return (
    <Paper sx={{ maxWidth: 500, borderRadius: 2, marginTop: 30, marginBottom: 10 }} elevation={5}>
      <Grid container gap={2} p={2}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Typography variant="h4" sx={{ m: 1, p: 1 }}>
            <b>Student Details</b>
          </Typography>
          {error && (
            <Typography sx={{ fontSize: 16, color: "red" }}>{error}</Typography>
          )}
        </Box>
        <Grid item xs={12}>
          <TextField
            required
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5.78}>
          <TextField
            required
            label="Registration Number"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5.78}>
          <TextField
            required
            label="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5.78}>
          <TextField
            required
            label="Level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5.78}>
          <TextField
            required
            label="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Typography variant="body2" component="h4">
          Amount: <b> ₦ 500</b>
        </Typography>
        <Grid item xs={12}>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              background:
                "linear-gradient(43deg, rgba(34,186,50,1) 0%, rgba(240,202,143,1) 100%)",
              fontWeight: "bold",
              color: "black",
            }}
            onClick={handleSubmit}
          >
            Pay
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Form;

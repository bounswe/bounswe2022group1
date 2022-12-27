//This file can be merged with frontend/pages/_app.js
import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://3.89.218.253:8000/app/change-password/", {
      method: "PUT",
      headers: {
        "content-type": "applications/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => {
        console.log(response);
        response.json();
      })
      .then((response) => {
        console.log(response);
        alert(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Box display="flex" justifyContent="center">
      <Paper
        sx={{
          padding: 6,
          marginTop: 15,
        }}
      >
        <Typography
          fontWeight="bold"
          textAlign="center"
          component="h1"
          variant="h5"
        >
          Forgot Password
        </Typography>

        <Typography sx={{ my: 1 }} textAlign="center">
          Please enter your email address.
          <br />
          We will you sent link for reset password
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, borderRadius: "16px" }}
          >
            Send Email
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

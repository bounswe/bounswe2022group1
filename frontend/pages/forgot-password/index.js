import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleClick = (e) => {
    fetch("http://3.89.218.253:8000/app/change-password/", {
      method: "PUT",
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
    e.preventDefault();
  };

  function handleSubmit(event) {
    console.log("username: " + email);
    console.log("password: " + password);
    fetch("http://3.89.218.253:8000/app/login/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", email);
          router.push("/profile");
          return;
        } else {
          alert("Failed with status code " + data.status);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    event.preventDefault();
  }

  return (
    <Box display="flex" justifyContent="center">
      <Paper
        sx={{
          padding: 6,
          marginTop: 15,
          //backgroundColor: "#dae7fb",
          // borderRadius: "15px",
        }}
      >
        <Typography
          fontWeight="bold"
          textAlign="center"
          component="h1"
          variant="h5"
        >
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: "16px" }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

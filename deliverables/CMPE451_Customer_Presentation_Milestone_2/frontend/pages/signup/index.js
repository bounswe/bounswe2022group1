import React, { useState } from "react";
import {
  Box,
  Container,
  Stack,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { LineAxisOutlined } from "@mui/icons-material";

export default function SignUp() {
  const { isAuthenticated, login } = useContext(AuthContext);
  const router = useRouter();

  if (typeof window != "undefined" && isAuthenticated) {
    router.push("/homepage", {}, { replace: true });
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    console.log("username: " + username);
    console.log("password: " + password);
    console.log("email: " + email);

    fetch("http://3.89.218.253:8000/app/register/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          alert("Failed with status code " + response.status);
        }
      })
      .then((response) => {
        console.log(response);
        if (response.token) {
          login(username, response.token);
          router.push("/profile");
          return;
        } else {
          alert("Failed with status code " + response.status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    event.preventDefault();
  }

  return (
    <Box display="flex" justifyContent="center">
      <Box
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
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
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
      </Box>
    </Box>
  );
}

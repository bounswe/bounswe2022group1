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
  Paper,
} from "@mui/material";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { LineAxisOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export default function SignUp() {
  const { isAuthenticated, login } = useContext(AuthContext);
  const router = useRouter();
  const theme = useTheme();

  if (typeof window != "undefined" && isAuthenticated) {
    router.push("/homepage", {}, { replace: true });
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
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
      <Paper
        elevation={2}
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
            fullWidth
            id="username"
            label="Username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
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
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

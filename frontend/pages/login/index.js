import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  Grid,
  Paper,
} from "@mui/material";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "../../utils/axios";
import { useSnackbar } from "notistack";

export default function Login() {
  const { login } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function handleSubmit(event) {
    fetch("http://3.89.218.253:8000/app/login/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then((data) => {
        login(username, data.token);
        router.push("/profile");
      })
      .catch((error) =>
        enqueueSnackbar(error.message || "Something went wrong", {
          variant: "error",
        })
      );

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
        <Typography fontWeight="bold" textAlign="center" variant="h5">
          Sign In
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            name="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 5 }}
          >
            Sign In
          </Button>
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Link
              component={NextLink}
              href="/forgot-password"
              sx={{ textDecoration: "none" }}
            >
              <Typography>Forgot password?</Typography>
            </Link>

            <Link
              href="/signup"
              component={NextLink}
              sx={{ textDecoration: "none" }}
            >
              <Typography>Don't have an account? Sign Up</Typography>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

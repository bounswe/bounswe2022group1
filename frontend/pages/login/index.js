import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "../../utils/axios";

export default function Login() {
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function handleSubmit(event) {
    /** Axios'u kullanmak için backende CORS ayarı yapılması lazım !!! */

    // axios
    //   .post("/login", { username, password })
    //   .then((response) => {
    //     login(username, response.data.data);
    //     router.push("/profile");
    //   })
    //   .catch((err) => console.log(err));

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
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          login(username, data.token);
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
          Sign in
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoFocus
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
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
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 5 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}

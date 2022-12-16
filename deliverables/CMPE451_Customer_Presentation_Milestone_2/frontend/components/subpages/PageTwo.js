import { useContext } from "react";
import { Typography, Container, Box, Divider } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";
import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
} from "@mui/material";
export default function PageTwo() {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [old_pass, setOldPass] = useState("");
  const [new_pass, setNewPass] = useState("");

  function handleSubmit(event) {
    fetch("http://3.89.218.253:8000/app/change-password/", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: "Token " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        old_pass: old_pass,
        new_pass: new_pass,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.code == 200) {
          router.push("/homepage");
          return;
        } else {
          alert("The credentials are wrong. " + data.status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    event.preventDefault();
  }

  return (
    <Box>
      <Typography mb={2} variant="h4" textAlign="center">
        {`Welcome ${user}`}
      </Typography>

      <Typography
        color="text.disabled"
        mb={2}
        variant="h5"
        textAlign="center"
      ></Typography>

      <Divider />
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="old_password"
          label="Old Password"
          name="username"
          autoFocus
          onChange={(e) => {
            setOldPass(e.target.value);
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="new_password"
          label="New Password"
          name="username"
          autoFocus
          onChange={(e) => {
            setNewPass(e.target.value);
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, borderRadius: "16px" }}
        >
          Change Password
        </Button>
      </Box>
    </Box>
  );
}

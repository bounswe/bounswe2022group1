import React, { useState } from "react";
import { Box, TextField, Typography, Button, Grid } from "@mui/material";
import { useRouter } from "next/router";

function ContentAdd({routerQuery, typeSent}) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [text, setText] = useState("");

  function handleText(event) {
    fetch("http://3.89.218.253:8000/app/content/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        'Authorization': `token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: name,
        text: text,
        learningSpace: routerQuery.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    event.preventDefault();
    router.push(`/detail/${routerQuery.id}`);
  }

  return (
    <Grid>
    <Box>
      <Box
        sx={{
          padding: 6,
          marginTop: 15,
          backgroundColor: "#dae7fb",
          borderRadius: "15px",
        }}
      >
        <Typography
          fontWeight="bold"
          textAlign="center"
          component="h1"
          variant="h5"
        >
          Add Resource
        </Typography>

        <Box component="form" onSubmit={handleText} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="resource"
            label="Resource"
            id="resource"
            multiline={true}
            rows={15}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: "16px" }}
          >
            Add Resource
          </Button>
        </Box>
      </Box>
    </Box>
  </Grid>
  );
}

export default ContentAdd;
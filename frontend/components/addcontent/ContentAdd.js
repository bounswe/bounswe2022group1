import React, { useState } from "react";
import { Box, TextField, Typography, Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

function ContentAdd({routerQuery}) {
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
        type: "text",
        text: text,
        learningSpace: routerQuery.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
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

           <div data-color-mode="light">
           <hr/>
           <Typography
          component="h2"
          variant="h6"
        >
          Text
        </Typography>
          <MDEditor height={500} value={text} onChange={(e) => {
              setText(e);
            }} />
          </div>
          <hr/>
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
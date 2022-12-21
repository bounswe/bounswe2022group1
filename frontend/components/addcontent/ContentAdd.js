import React, { useState } from "react";
import {
  Box,
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

function ContentAdd({routerQuery, typeSent}) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");

  function handleText(event) {
    fetch("http://3.89.218.253:8000/app/content/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        'Authorization': `token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: name,
        type: typeSent,
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

  function handleUrl(event) {
    fetch("http://3.89.218.253:8000/app/content/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        'Authorization': `token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: name,
        type: typeSent,
        url: url,
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
    <Box display="flex" justifyContent="center">
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
          Add {typeSent} Content
        </Typography>


        {typeSent==="text" || typeSent==="meeting" ? 
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
                name="text"
                label="Text"
                id="text"
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
            Add {typeSent} Content
          </Button>
        </Box>
        : 
        typeSent==="image" || typeSent==="video" ? 
        <Box component="form" onSubmit={handleUrl} noValidate sx={{ mt: 1 }}>
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
                name="url"
                label="Url"
                id="url"
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
              />
              <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: "16px" }}
          >
            Add {typeSent} Content
          </Button>
        </Box>
        : console.log("")
        }

        
      </Box>
    </Box>

  );
}

export default ContentAdd;
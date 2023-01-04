import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { format } from "date-fns";
import axios from "axios";
import { Component, useState } from "react";

export default function Discussion({ comments, content_id }) {
  const [comment, setComment] = useState("");

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    axios
      .post(
        `http://3.89.218.253:8000/app/discussion/`,
        {
          content: content_id,
          body: comment,
        },
        {
          headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(comments);

  return (
    <Grid sx={{ mt: 5 }}>
      <Paper>
        <Typography variant="h6">Discussion</Typography>

        {comments &&
          comments.map((comment) => (
            <Card variant="outlined" key={comment?.id}>
              <Stack direction="row" spacing={2}>
                <Typography variant="subtitle2">
                  {comment?.owner.username}
                </Typography>
                <Typography variant="overline">
                  {format(new Date(comment?.created_on), "d MMMM, yyyy")}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="body" textAlign="left" sx={{ ml: 3 }}>
                  {comment?.body}
                </Typography>
              </Stack>
            </Card>
          ))}
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter a comment."
              onChange={handleChange}
            />
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </Paper>
    </Grid>
  );
}

import { useContext } from "react";
import { Typography, Container, Box, Divider, Paper, Button, Card, TextField } from "@mui/material";
import { format } from "date-fns";
import { AuthContext } from "../../../contexts/AuthContext";
import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import axios from "axios";
import { useRouter } from "next/router";
import ReactMarkdown from 'react-markdown'


export default function Main() {
    const router = useRouter()
  const { id } = router.query;
  const [resource, setResource] = useState(null);
  const [comments, setComments] = useState(null);
  const [comment, setComment] = useState("");


  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    event.preventDefault();
    const { id } = router.query;
    if (!id) return;
    axios
      .post(
        `http://3.89.218.253:8000/app/discussion/`,
        {
          content: id,
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
        useEffect();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(comments);


  useEffect(() => {
    const { id } = router.query;
    if (!id) return;

    const getResource = async () => {
      const baseURL = `http://3.89.218.253:8000/app/content/?id=${id}`;
      const res = await axios.get(baseURL, {
        headers: { Authorization: `token ${localStorage.getItem("token")}` },
      });
      setResource(res.data);
    };
    const getComments = async () => {
      const baseURL = `http://3.89.218.253:8000/app/discussion-list/?content_id=${id}`;
      const res = await axios.get(baseURL, {
        headers: { Authorization: `token ${localStorage.getItem("token")}` },
      });
      setComments(res.data.data);
    };
    getResource();
    getComments();
  }, [router]);

  return (
    <div>
    <Box>
      <Typography mb={2} variant="h4" textAlign="center">
        {`${resource?.name}`}
      </Typography>

      <Typography

        mb={2}
        variant="h5"
      >{<ReactMarkdown>{resource?.text}</ReactMarkdown>}</Typography>

      <Divider />
     
    </Box>
    <Box>
        <Typography mb={2} variant="h6" textAlign="center">
        Discussion
      </Typography>



        {comments &&
          comments.map((comment) => (
            <Card sx ={{p: 1.5, borderRadius: '16px', m:1}} >
                <Typography gutterBottom color= 'text.secondary'>
                    {comment?.owner.username} | {format(new Date(comment?.created_on), "d MMMM, yyyy")}
                </Typography>
            
                <Typography gutterBottom sx ={{ml: 8}}>
                {`        ${comment?.body}`}
                </Typography>
            </Card>
          ))}
        {/* <form>
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
        </form> */}

<TextField
            margin="normal"
            fullWidth
            name="comment"
            label="Enter your comment"
            type="comment"
            id="comment"
            onChange={(e) => setComment(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 3, mb: 2, borderRadius: "16px" }}
          >
            Submit
          </Button>

    </Box>
    </div>
  );
}

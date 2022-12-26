import { useContext } from "react";
import {
  Typography,
  Container,
  Box,
  Divider,
  Paper,
  Button,
  Card,
  TextField,
} from "@mui/material";
import { format } from "date-fns";
import { AuthContext } from "../../../contexts/AuthContext";
import React, { useState, useEffect, useCallback } from "react";
import { useRef } from "react";
import { Routes, Route, useParams, renderMatches } from "react-router-dom";
import axios from "axios";
import { useRouter } from "next/router";
import ReactMarkdown from 'react-markdown';
import "@recogito/recogito-js/dist/recogito.min.css";
import "@recogito/annotorious/dist/annotorious.min.css";
import IconButton from "@mui/material/IconButton";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';


export default function Main() {
    const router = useRouter()
  const { id } = router.query;
  const [resource, setResource] = useState(null);
  const [comments, setComments] = useState(null);
  const [comment, setComment] = useState("");


  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
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
      .then(function (response) {
        console.log('Success', response);
        // TODO setComments(eski comment + yeni comments)

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
    })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleUpvote = e => {
    e.preventDefault();
    const { id } = router.query;
    if (!id) return;
    axios
      .patch(
        `http://3.89.218.253:8000/app/content/`,
        {
          id: id,
          upVoteCount: resource.upVoteCount + 1,
        },
        {
          headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {   //TODO ECE
        console.log('Success', response);
        setResource(response.data);
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

  const paraEl = useRef();
  

  const [reco, setReco] = useState();
  const [anno, setAnno] = useState();

  const [called, setCalled] = useState(false);

  // Current drawing tool name
  const [tool, setTool] = useState("rect");

  useEffect(() => {
    if (called) return;
    setCalled(true);
    import("@recogito/recogito-js").then((mod) => {
      const Recogito = mod.Recogito;

      const r = new Recogito({ content: paraEl.current });

      r.setAuthInfo({
        id: localStorage.getItem("token"),
        displayName: localStorage.getItem("user"),
      });

      r.on("createAnnotation", (annotation) => {
        console.log(annotation);
      });

      setReco(r);
    });

  //   import("@recogito/annotorious").then((mod) => {
  //     const Annotorious = mod.Annotorious;

  //     console.log(mod);
  //     const a = new Annotorious({ image: imgEl.current });

  //     a.setAuthInfo({
  //       id: localStorage.getItem("token"),
  //       displayName: localStorage.getItem("user"),
  //     });
  //   });
   }, []);


  
  return (
    <div>
    <Box>
    <IconButton aria-label="upvote" color="secondary" onClick={handleUpvote}>
                  <ThumbUpAltIcon />     Upvotes: {resource?.upVoteCount}
                </IconButton>
      <Typography mb={2} variant="h4" textAlign="center">
        {`${resource?.name}`}
      </Typography>
      <Typography
        mb={2}
        variant="h5"
        ref={paraEl}
      ><ReactMarkdown>{resource?.text}</ReactMarkdown></Typography>

        <Divider />
      </Box>
      <Box>
        <Typography mb={2} variant="h6" textAlign="center">
          Discussion
        </Typography>

        {comments &&
          comments.map((comment) => (
            <Card sx={{ p: 1.5, borderRadius: "16px", m: 1 }}>
              <Typography gutterBottom color="text.secondary">
                {comment?.owner.username} |{" "}
                {format(new Date(comment?.created_on), "d MMMM, yyyy")}
              </Typography>

              <Typography gutterBottom sx={{ ml: 8 }}>
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

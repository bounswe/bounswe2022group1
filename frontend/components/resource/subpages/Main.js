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
import ReactMarkdown from "react-markdown";
import "@recogito/recogito-js/dist/recogito.min.css";
import "@recogito/annotorious/dist/annotorious.min.css";
import IconButton from "@mui/material/IconButton";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

export default function Main() {
  const router = useRouter();
  const { id } = router.query;
  const [resource, setResource] = useState(null);
  const [comments, setComments] = useState(null);
  const [comment, setComment] = useState("");

  const [creator, setCreator] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  const [annotationsMap, setAnnotationsMap] = useState({});

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (e) => {
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
        console.log("Success", response);
        // TODO setComments(eski comment + yeni comments)

        const getResource = async () => {
          const baseURL = `http://3.89.218.253:8000/app/content/?id=${id}`;
          const res = await axios.get(baseURL, {
            headers: {
              Authorization: `token ${localStorage.getItem("token")}`,
            },
          });
          setResource(res.data);
        };
        const getComments = async () => {
          const baseURL = `http://3.89.218.253:8000/app/discussion-list/?content_id=${id}`;
          const res = await axios.get(baseURL, {
            headers: {
              Authorization: `token ${localStorage.getItem("token")}`,
            },
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

  const handleUpvote = (e) => {
    e.preventDefault();
    const { id } = router.query;
    if (!id) return;
    axios
      .patch(
        `http://3.89.218.253:8000/app/content/`,
        {
          id: id,
          url: "xxx",
          upVoteCount: resource.upVoteCount + 1,
        },
        {
          headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        //TODO ECE
        console.log("Success", response);
        setResource(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(comments);

  const bindCreateAnnotation = (object, id) => {
    object.on("createAnnotation", (annotation) => {
      const baseURL = `http://3.89.218.253:8001/app/annotation/`;
      axios
        .post(
          baseURL,
          {
            content_id: id,
            annotation_string: JSON.stringify(annotation),
          },
          {
            headers: {
              Authorization: `token ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          annotationsMap[annotation.id] = res.data.id;
        });
    });
  };

  const bindUpdateAnnotation = (object, id) => {
    object.on("updateAnnotation", (annotation, previous) => {
      const baseURL = `http://3.89.218.253:8001/app/annotation/`;
      axios
        .patch(
          baseURL,
          {
            content_id: id,
            id: annotationsMap[previous.id],
            annotation_string: JSON.stringify(annotation),
          },
          {
            headers: {
              Authorization: `token ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {});
    });
  };

  const bindDeleteAnnotation = (object, id) => {
    object.on("deleteAnnotation", (annotation) => {
      const baseURL = `http://3.89.218.253:8001/app/delete-annotation/`;
      axios
        .post(
          baseURL,
          {
            content_id: id,
            id: annotationsMap[annotation.id],
          },
          {
            headers: {
              Authorization: `token ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {});
    });
  };

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
    const getCreator = async () => {
      const baseURL = `http://3.89.218.253:8000/app/content/?id=${id}`;
      const res = await axios.get(baseURL, {
        headers: { Authorization: `token ${localStorage.getItem("token")}` },
      });

      const baseURL2 = `http://3.89.218.253:8000/app/user-from-id/?id=${res.data.owner}`;
      const res2 = await axios.get(baseURL2, {
        headers: { Authorization: `token ${localStorage.getItem("token")}` },
      });
      const str = `Creator: ${res2.data.username}`;
      setCreator(str);
      if (res2.data.username == localStorage.getItem("user")) {
        setShowEdit(true);
      }
    };
    getResource();
    getComments();
    getCreator();
  }, [router]);

  const paraEl = useRef();
  const imgEl = useRef();

  const [reco, setReco] = useState();
  const [anno, setAnno] = useState();

  const [recoCalled, setRecoCalled] = useState(false);
  const [annoCalled, setAnnoCalled] = useState(false);

  // Current drawing tool name
  const [tool, setTool] = useState("rect");

  useEffect(() => {
    const { id } = router.query;
    if (!id) return;

    if (recoCalled) return;
    setRecoCalled(true);

    import("@recogito/recogito-js").then((mod) => {
      const Recogito = mod.Recogito;

      const r = new Recogito({ content: paraEl.current });

      r.setAuthInfo({
        id: localStorage.getItem("token"),
        displayName: localStorage.getItem("user"),
      });

      bindCreateAnnotation(r, id);
      bindUpdateAnnotation(r, id);
      bindDeleteAnnotation(r, id);

      const baseURL = `http://3.89.218.253:8001/app/annotation/?content_id=${id}`;

      axios
        .get(baseURL, {
          headers: { Authorization: `token ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          res.data.data.forEach((element) => {
            const annotation_object = JSON.parse(element.annotation_string);
            r.addAnnotation(annotation_object);
            annotationsMap[annotation_object.id] = element.id;
          });
        });

      setReco(r);
    });
  }, [router]);

  useEffect(() => {
    console.log(resource);
  }, [resource]);

  useEffect(() => {
    const { id } = router.query;
    if (!id) return;

    const image = document.querySelector(".r6o-content-wrapper img");

    if (!image) return;

    if (annoCalled) return;
    setAnnoCalled(true);

    import("@recogito/annotorious").then((mod) => {
      const Annotorious = mod.Annotorious;
      const a = new Annotorious({ image: image });
      a.setAuthInfo({
        id: localStorage.getItem("token"),
        displayName: localStorage.getItem("user"),
      });

      bindCreateAnnotation(a, id);
      bindUpdateAnnotation(a, id);
      bindDeleteAnnotation(a, id);

      const baseURL = `http://3.89.218.253:8001/app/annotation/?content_id=${id}`;
      axios
        .get(baseURL, {
          headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          res.data.data.forEach((element) => {
            const annotation_object = JSON.parse(element.annotation_string);
            if (!annotation_object.target?.source) return;

            a.addAnnotation(annotation_object);
            annotationsMap[annotation_object.id] = element.id;
          });
        });
    });
  });

  return (
    <div>
      <Box>
        <IconButton
          aria-label="upvote"
          color="secondary"
          onClick={handleUpvote}
        >
          <ThumbUpAltIcon /> Upvotes: {resource?.upVoteCount}
        </IconButton>
        <Typography mb={2} variant="h4" textAlign="center">
          {`${resource?.name}`}
        </Typography>
        <Typography mb={2} variant="h5" ref={paraEl}>
          <ReactMarkdown includeElementIndex>{resource?.text}</ReactMarkdown>
        </Typography>

        <Divider />

        {showEdit ? <Button href={`/edit-resource/${resource?.id}`} >Edit</Button> : null}
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

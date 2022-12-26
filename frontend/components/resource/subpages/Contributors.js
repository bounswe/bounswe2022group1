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
import axios from "axios";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import ProfileCard from "./ProfileCard";

export default function Main() {
  const router = useRouter();
  const { id } = router.query;
  const [creator, setCreator] = useState(null);
  const [commentors, setCommentors] = useState(null);

  const commentorsCards = [];

  useEffect(() => {
    const { id } = router.query;
    if (!id) return;

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
    };
    const getCommentors = async () => {
      const baseURL = `http://3.89.218.253:8000/app/discussion-list/?content_id=${id}`;
      const res = await axios.get(baseURL, {
        headers: { Authorization: `token ${localStorage.getItem("token")}` },
      });
      var peopleIds = [];
      for (const comment of res.data.data) {
        if (!peopleIds.includes(comment.owner.username)) {
          peopleIds?.push(comment.owner.username);
        }
      }
      setCommentors(peopleIds);
    };

    getCreator();
    getCommentors();
  }, [router]);

  return (
    <Box>
      <Typography mb={2} variant="h6" textAlign="center">
        Contributors
      </Typography>
      <Card sx={{ p: 1.5, borderRadius: "16px", m: 1 }}>
        <Typography gutterBottom color="text.secondary">
          {creator}
        </Typography>
      </Card>

      {commentors &&
        commentors.map((person) => (
          <Card sx={{ p: 1.5, borderRadius: "16px", m: 1 }}>
            <Typography gutterBottom color="text.secondary">
              {person}
            </Typography>
          </Card>
        ))}
    </Box>
  );
}

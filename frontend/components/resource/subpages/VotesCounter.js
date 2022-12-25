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
import { Routes, Route, useParams } from "react-router-dom";
import axios from "axios";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { SYMBOL_CLEARED_COOKIES } from "next/dist/server/api-utils";
import Image from "next/image";

export default function VotesCounter({ id }) {
    const router = useRouter();
  const [vote, setVote] = useState(0);

  useEffect(() => {
    const { id } = router.query;
    if (!id) return;
    const getVote= async () => {
      if (id) {
        const baseURL = `http://3.89.218.253:8000/app/content/?id=${id}`;
        const res = await axios.get(baseURL);
        console.log(res.data.user);
        setVote(res.data.upVoteCount);
      }
    };
    getVote();
    console.log(vote);
  }, [router]);

  return (
    <div>{vote}</div>
  );
}

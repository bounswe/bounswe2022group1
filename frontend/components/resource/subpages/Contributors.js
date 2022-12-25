import { useContext } from "react";
import { Typography, Container, Box, Divider, Paper, Button, Card, TextField } from "@mui/material";
import { format } from "date-fns";
import { AuthContext } from "../../../contexts/AuthContext";
import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import axios from "axios";
import { useRouter } from "next/router";
import ReactMarkdown from 'react-markdown'
import ProfileCard from "./ProfileCard";

export default function Main() {
    const router = useRouter()
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
      setCreator(res.data.owner);
    };
    const getCommentors = async () => {
      const baseURL = `http://3.89.218.253:8000/app/discussion-list/?content_id=${id}`;
      const res = await axios.get(baseURL, {
        headers: { Authorization: `token ${localStorage.getItem("token")}` },
      });
      var peopleIds = [];
      for(const comment of res.data.data){
        console.log(peopleIds);
        
        if(!peopleIds?.find((comment.owner.id))){
            peopleIds.push((comment.owner.id));
        }
        console.log(comment);
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
      <Card sx ={{p: 1.5, borderRadius: '16px', m:1}} >
                <Typography gutterBottom color= 'text.secondary'>
                   
                </Typography>
                <ProfileCard id={creator}/>
            </Card>



        {commentors &&
          commentors?.map((person) => (
            <Card sx ={{p: 1.5, borderRadius: '16px', m:1}} >
                <Typography gutterBottom color= 'text.secondary'>
                <ProfileCard id={person}/>
                </Typography>
            </Card>
          ))}

    </Box>
  );
}
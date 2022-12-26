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
  //const [notes, setNotes] = useState(null);
  const [note, setNote] = useState(null);
  const [noteBody, setNoteBody] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    const { id } = router.query;
    if (!id) return;
    axios
      .post(
        `http://3.89.218.253:8000/app/note/`,
        {
          content: id,
          body: noteBody,
        },
        {
          headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        console.log("Success", response);
        // TODO get notes aynisi
        const getNote = async () => {
          const baseURL = `http://3.89.218.253:8000/app/note/?content_id=${id}`;
          const res = await axios.get(baseURL, {
            headers: { Authorization: `token ${localStorage.getItem("token")}` },
          });
          console.log(res.data.data);
          var latestNote = "";
          const len = res.data.data.length
          if(len > 0){
            latestNote = res.data.data[len -1];
          }

          setNote(latestNote);
        };
        getNote();
        //TODO getnotes aynisi

        

      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const { id } = router.query;
    if (!id) return;

    
    const getNote = async () => {
      const baseURL = `http://3.89.218.253:8000/app/note/?content_id=${id}`;
      const res = await axios.get(baseURL, {
        headers: { Authorization: `token ${localStorage.getItem("token")}` },
      });
      console.log(res.data.data);
      var latestNote = "";
      const len = res.data.data.length
      if(len > 0){
        latestNote = res.data.data[len -1];
      }
      setNote(latestNote);
    };
    getNote();
  }, [router]);

  return (
    <Box>
      <Typography mb={2} variant="h6" textAlign="center">
        My Note
      </Typography>


            {note && 
            (<Card sx={{ p: 1.5, borderRadius: "16px", m: 1 }}>
              <Typography gutterBottom color="text.secondary">
                
                {format(new Date(note?.created_on), "d MMMM, yyyy")}
              </Typography>

              <Typography gutterBottom sx={{ ml: 8 }}>
                {`        ${note?.body}`}
              </Typography>
            </Card>)
}
          

<TextField
          margin="normal"
          fullWidth
          name="note"
          type="note"
          id="note"
          value={noteBody}
          onChange={(e) => setNoteBody(e.target.value)}
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
  );
}

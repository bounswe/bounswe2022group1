import { useContext } from "react";
import { Typography, Container, Box, Divider, Paper, Button, Card, TextField } from "@mui/material";
import { format } from "date-fns";
import { AuthContext } from "../../../contexts/AuthContext";
import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import axios from "axios";
import { useRouter } from "next/router";
import ReactMarkdown from 'react-markdown'
import { SYMBOL_CLEARED_COOKIES } from "next/dist/server/api-utils";
import Image from "next/image";

export default function ProfileCard({ id }){
    const [card, setCard] = useState(null);

    useEffect(() => {
        const getCard = async () => {
            console.log("id is");
            console.log(id);
            if(id){
                const baseURL = `http://3.89.218.253:8000/app/profile/?user_id=${id}`;
            const res = await axios.get(baseURL, {
              headers: { Authorization: `token ${localStorage.getItem("token")}` },
            });
            console.log(res.data.user);
            setCard(res.data.user);
            }
          };
        getCard();
        console.log(card);
    }, []);

    
    return(
        <div>
        <p> {card?.id}</p>
        <p> {card?.username}</p>
        </div>
    );

}
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import axios from "axios";
import TextContentsPage from "./TextContentsPage";
import { getCardContentUtilityClass } from "@mui/material";

const ContentPage = () => {

    const [content, setContent] = useState([]);
    const params = useParams();

    useEffect(() => {
        const getContent = async () => {
            const baseURL = `http://3.89.218.253:8000/app/content/?id=${params.id}`;
            const res = await axios.get(baseURL, { headers: {"Authorization" : `token ${localStorage.getItem("token")}`} })
            setContent(res.data)
            console.log(res.data)
        }
        getContent()
    }, []);



    return (
        <>
            <div>
                <TextContentsPage content={content} ownerUsername={content.owner}/>
            </div>
        </>
    )
}

export default ContentPage;
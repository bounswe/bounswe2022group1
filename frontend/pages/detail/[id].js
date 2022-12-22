import React, { useState, useEffect } from "react";
import axios from "axios";
import DetailInfoPage from "../../components/detail/DetailInfoPage";
import { useRouter } from "next/router";
import {Container} from "@mui/material";


const DetailPage = () => {
  const [space, setSpace] = useState(null);
  const [content, setContent] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    if (!id) return;

    const getSpace = async () => {
      const baseURL = `http://3.89.218.253:8000/app/learning-space/?id=${id}`;
      const res = await axios.get(baseURL, {
        headers: { Authorization: `token ${localStorage.getItem("token")}` },
      });
      setSpace(res.data);
    };
    const getContentList = async () => {
      const baseURL = `http://3.89.218.253:8000/app/content-list/?learning_space_id=${id}`;
      const res = await axios.get(baseURL, {
        headers: { Authorization: `token ${localStorage.getItem("token")}` },
      });
      setContent(res.data.data);
    };
    getContentList();
    getSpace();
  }, [router]);

  return (
    <div>
    <Container
    sx={{
      borderRadius: "16px",
      background: "#dae7fb",
    }}
  >
    <DetailInfoPage space={space} content={content}/>
     </Container>
    </div>

  );
};

export default DetailPage;

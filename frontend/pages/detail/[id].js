import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import DetailInfoPage from "../../components/detail/DetailInfoPage";
import { useRouter } from "next/router";
import { AuthContext } from "../../contexts/AuthContext";
import {Container} from "@mui/material";


const DetailPage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!user) return;
  });
  
  const [space, setSpace] = useState(null);

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
    getSpace();
  }, [router]);

  return (
    <Container
    sx={{
      borderRadius: "16px",
      background: "#dae7fb",
    }}
  >
    <DetailInfoPage space={space}/>
     </Container>
  );
};

export default DetailPage;

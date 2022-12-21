import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import DetailInfoPage from "../../components/detail/DetailInfoPage";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

const handleJoin = (spid) => {
  axios.post(`http://3.89.218.253:8000/app/enroll/`, {
      learning_space_id: spid,
      },{headers: {
          'Authorization': `token ${localStorage.getItem("token")}`
      }})
      .then((response) => {
          console.log(response.data);
    alert("Successfully enrolled "+response.data.name+" for user "+localStorage.getItem("user"));
      }, (error) => {
          console.log(error);
   });
}


const DetailPage = () => {
  const [space, setSpace] = useState(null);
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
    getSpace();
  }, [router]);

  return (
    <>
      <div>
        <DetailInfoPage space={space}/>
      </div>
    </>
  );
};

export default DetailPage;

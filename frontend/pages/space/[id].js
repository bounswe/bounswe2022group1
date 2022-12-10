import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SpaceInfoPage from "../../components/space/SpaceInfoPage";
import { useRouter } from "next/router";


const SpacePage = () => {
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
        <SpaceInfoPage space={space}/>
        
      </div>
    </>
  );
};

export default SpacePage;

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import AddContentInfoPage from "../../../components/addcontent/AddContentInfoPage";

import { useRouter } from "next/router";


const AddContent = () => {
  const router = useRouter();

  useEffect(() => {
    const query = router.query;
    if (!query.id) return;

  }, [router]);

  return (
    
    <>
    <div>
      <AddContentInfoPage routerQuery={router.query}/>
    </div>
    </>
  );
};

export default AddContent;

import React, { useEffect, useContext } from "react";
import AddContentInfoPage from "../../components/addcontent/AddContentInfoPage";
import { AuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router";


const AddContent = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!user) return;
  });

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

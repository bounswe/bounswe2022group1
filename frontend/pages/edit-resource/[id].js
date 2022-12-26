import React, { useEffect, useContext } from "react";
import EditResourcePage from "../../components/edit-resource/EditResourcePage";
import { AuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router";


const EditResource = () => {
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
      <EditResourcePage routerQuery={router.query}/>
    </div>
    </>
  );
};

export default EditResource;

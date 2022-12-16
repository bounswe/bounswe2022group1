import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TextContentsPage from "../../components/content/TextContentsPage";
import { useRouter } from "next/router";

const ContentPage = () => {
  const [content, setContent] = useState(null);
  const [comments, setComments] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    if (!id) return;

    const getContent = async () => {
      const baseURL = `http://3.89.218.253:8000/app/content/?id=${id}`;
      const res = await axios.get(baseURL, {
        headers: { Authorization: `token ${localStorage.getItem("token")}` },
      });
      setContent(res.data);
    };
    const getComments = async () => {
      const baseURL = `http://3.89.218.253:8000/app/discussion-list/?content_id=${id}`;
      const res = await axios.get(baseURL, {
        headers: { Authorization: `token ${localStorage.getItem("token")}` },
      });
      setComments(res.data.data);
    };
    getContent();
    getComments();
  }, [router]);

  return (
    <>
      <div>
        <TextContentsPage content={content} comments={comments} />
      </div>
    </>
  );
};

export default ContentPage;

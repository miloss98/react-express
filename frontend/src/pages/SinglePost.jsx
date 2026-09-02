import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const SinglePost = () => {
  const [postData, setPostData] = useState();
  const [loading, setLoading] = useState(true);
  const { postId } = useParams();
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/feed/post/" + postId,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const result = await response.json();
        setPostData(result.post);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [postId, token]);

  if (loading) {
    return <p> loading... </p>;
  }

  return (
    <div className="flex gap-1">
      <button className="cursor-pointer" onClick={() => navigate(-1)}>
        Back
      </button>
      {postData && (
        <div
          key={postData._id}
          className="flex flex-col gap-2 bg-gray-300 w-xl p-4"
        >
          <p className="text-3xl font-bold"> {postData.title}</p>
          <p> {postData.content} </p>
          <img src={postData.imageUrl} width={200} height={200} alt="aaa" />
          <p>Author: {postData.creator.name}</p>
          <p>Created at: {postData.createdAt}</p>
        </div>
      )}
    </div>
  );
};

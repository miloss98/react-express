import { useEffect, useState } from "react";
import { AddPost } from "../components/AddPost";

export const Home = () => {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/feed/posts");
        const result = await response.json();
        setPosts(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p> loading... </p>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-3xl py-4"> Feed </h1>
      {posts &&
        posts.map((post) => {
          return (
            <div key={Math.random} className="flex flex-col">
              <p> {post.title}</p>{" "}
            </div>
          );
        })}

      <AddPost />
    </div>
  );
};

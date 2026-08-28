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
        setPosts(result.posts);
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
      <div className="flex flex-col gap-6">
        {posts &&
          posts.map((post) => {
            return (
              <div
                key={post._id}
                className="flex flex-col gap-2 bg-gray-300 w-xl p-4"
              >
                <p className="text-3xl font-bold"> {post.title}</p>
                <img src={post.imageUrl} width={200} height={200} alt="aaa" />
                <a className="text-red-500" href={`/posts/${post._id}`}>
                  See details &gt;
                </a>
              </div>
            );
          })}
      </div>
      <AddPost />
    </div>
  );
};

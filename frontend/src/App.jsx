import { useEffect, useState } from "react";

export const App = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/feed/posts");
        const result = await response.json();
        setPosts(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1> Hello</h1>
      <div>
        {posts &&
          posts.map((post) => {
            return (
              <div key={Math.random}>
                <p> {post.title}</p>{" "}
              </div>
            );
          })}
      </div>
    </div>
  );
};

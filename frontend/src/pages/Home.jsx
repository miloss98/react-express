import { useEffect, useState, useContext } from "react";
import { AddPost, EditPost } from "../components";
import { AuthContext } from "../context/AuthContext";

const PAGE_SIZE = 2;

export const Home = () => {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [totalPosts, setTotalPosts] = useState();
  const [page, setPage] = useState(1);

  const { token } = useContext(AuthContext);

  const handleEdit = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/feed/posts?page=${page}&limit=${PAGE_SIZE}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const result = await response.json();

        setPosts(result.posts);
        setTotalPosts(result.totalItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, token]);

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/feed/delete-post/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId),
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) => (p._id === updatedPost._id ? updatedPost : p)),
    );
  };

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-3xl py-4">Feed</h1>

      <div className="flex flex-col gap-6">
        {posts &&
          posts.map((post) => {
            return (
              <div
                key={post._id}
                className="flex flex-col gap-2 bg-gray-300 w-xl p-4 relative h-full"
              >
                <p className="text-3xl font-bold">{post.title}</p>

                <img src={post.imageUrl} width={200} height={200} alt="aaa" />

                <div className="flex w-full justify-between">
                  <a className="text-orange-500" href={`/posts/${post._id}`}>
                    See details
                  </a>

                  <div className="flex gap-2 ">
                    <button
                      onClick={() => handleEdit(post)}
                      className="text-blue-500 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="text-red-500 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        <div className="flex gap-2 justify-between">
          <button
            className="text-green-500 cursor-pointer"
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            {"<"} Prev
          </button>
          <p> Page {page}</p>
          <button
            className="text-green-500 cursor-pointer"
            disabled={page >= totalPosts / PAGE_SIZE}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next {">"}
          </button>
        </div>
      </div>

      <EditPost
        key={selectedPost?._id}
        post={selectedPost}
        isOpen={selectedPost !== null}
        onClose={handleCloseModal}
        onPostUpdated={handlePostUpdated}
      />

      <AddPost setPosts={setPosts} />
    </div>
  );
};

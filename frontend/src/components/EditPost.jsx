import { useState } from "react";

export const EditPost = ({ post, isOpen, onClose, onPostUpdated }) => {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    content: post?.content || "",
    imageUrl: post?.imageUrl || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/feed/update-post/${post._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const updatedPost = result.post || result;

      if (onPostUpdated) {
        onPostUpdated(updatedPost);
      }

      onClose();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[65vw] h-[35vw] bg-amber-200 flex flex-col gap-2 justify-center items-center">
        <button
          onClick={onClose}
          className="text-3xl cursor-pointer text-red-500"
        >
          &times;
        </button>

        <p className="text-3xl font-semibold">Edit post</p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="gap-2 flex flex-col"
        >
          <div className="gap-2 flex">
            <label htmlFor="title">Title</label>

            <input
              value={formData.title}
              onChange={handleChange}
              type="text"
              name="title"
              id="title"
              className="border-black border-2"
            />
          </div>

          <div className="gap-2 flex">
            <label htmlFor="content">Content</label>

            <input
              value={formData.content}
              onChange={handleChange}
              type="text"
              name="content"
              id="content"
              className="border-black border-2"
            />
          </div>

          <div className="gap-2 flex">
            <label htmlFor="imageUrl">Image URL</label>

            <input
              value={formData.imageUrl}
              onChange={handleChange}
              type="text"
              name="imageUrl"
              id="imageUrl"
              className="border-black border-2"
            />
          </div>

          <button type="submit" className="border border-black cursor-pointer">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

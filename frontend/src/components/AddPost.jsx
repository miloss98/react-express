import { useState } from "react";

export const AddPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 Form submit triggered!");
    try {
      const response = await fetch("http://localhost:8080/feed/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center py-10">
      <p className="text-3xl font-semibold"> New post</p>
      <form onSubmit={handleSubmit} noValidate className="gap-2 flex flex-col">
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
          <label htmlFor="imageUrl">Image Url</label>
          <input
            value={formData.imageUrl}
            onChange={handleChange}
            type="text"
            name="imageUrl"
            id="imageUrl"
            className="border-black border-2 "
          />
        </div>
        <button type="submit" className="border border-black cursor-pointer">
          Submit
        </button>
      </form>
    </div>
  );
};

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setUserData({
        email: "",
        password: "",
        name: "",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full justify-center items-center pt-20">
      <div className="flex flex-col bg-red-100 gap-12 py-8 items-center w-2xl justify-center">
        <h1> Create your account. </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
              value={userData.email}
              className="border-2"
            />
          </div>

          <div className="flex gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={userData.password}
              className="border-2"
            />
          </div>

          <div className="flex gap-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={userData.name}
              className="border-2"
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

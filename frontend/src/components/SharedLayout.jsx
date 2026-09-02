import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const SharedLayout = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-slate-800 text-white">
        <nav className="flex gap-4">
          <a href="/">Home</a>

          {!isLoggedIn && (
            <>
              <a href="/login">Login</a>
              <a href="/signup">Signup</a>
            </>
          )}
        </nav>

        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Logout
          </button>
        )}
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};

import { Outlet } from "react-router-dom";

export const SharedLayout = () => {
  return (
    <div>
      <div className="w-full flex py-6 bg-amber-400 items-center justify-center">
        <h1> Navbar</h1>
      </div>
      <Outlet />
    </div>
  );
};

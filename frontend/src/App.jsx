import { Routes, Route } from "react-router-dom";
import { Register, Login, Home, SinglePost } from "./pages";
import { ProtectedRoute, SharedLayout } from "./components";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="/posts/:postId" element={<SinglePost />} />
        </Route>
      </Route>
    </Routes>
  );
};

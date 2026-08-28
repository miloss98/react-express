import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SharedLayout } from "./components/SharedLayout";
import { SinglePost } from "./components/SinglePost";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/posts/:postId" element={<SinglePost />} />
      </Route>
    </Routes>
  );
};

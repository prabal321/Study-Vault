import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import UserProfile from "./components/Profile/UserProfile";
import PostDetails from "./components/PostDetails/PostDetails";
import StartPage from "./components/StartPage/StartPage";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/posts" element={<Home />} />
      <Route path="/posts/search" element={<Home />} />
      <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
      <Route path="/profile/:id" element={<UserProfile />} />
      <Route path="/posts/:id" element={<PostDetails />} />
    </Routes>
  );
};

export default App;

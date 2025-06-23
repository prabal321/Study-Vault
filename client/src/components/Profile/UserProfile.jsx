import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { followUser, userProfile, deleteUser } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Post from "../Posts/Post/Post";
import { useLocation, useNavigate } from "react-router-dom";
import decode from "jwt-decode";
import * as actionType from "../../constants/actionTypes";
import Form from "../Form/Form";
import { getPosts } from "../../actions/posts";

const UserProfile = () => {
  const userdata = useSelector((state) => state.authReducer.userData);
  const { posts } = useSelector((state) => state.posts);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  // Clear userdata if viewing other profile
  const profileData = userdata._id === id ? userdata : {};

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate("/");
    setUser(null);
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const lenFollowers = profileData.followers ? profileData.followers.length : 0;
  const lenFollowing = profileData.following ? profileData.following.length : 0;
  const userPosts = posts?.filter((post) => post.creator === id);

  const handleFollowUser = () => {
    dispatch(followUser(profileData?._id));
    window.location.reload();
  };

  useEffect(() => {
    dispatch(userProfile(id));
  }, [id]);

  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteUser(user?.result?._id));
      logout();
      alert("Account Deleted, Hope To See You Again!!");
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="bg-primary min-h-screen">
      <Navbar />
      <div className="flex flex-col justify-center pt-20">
        <div className="p-6">
          <div className="bg-secondary shadow rounded-xl p-8 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="grid grid-cols-3 text-center md:order-first mt-8 md:mt-0">
                <div>
                  <p className="font-bold text-accent text-xl">
                    {lenFollowers}
                  </p>
                  <p className="text-muted-text">Followers</p>
                </div>
                <div>
                  <p className="font-bold text-accent text-xl">
                    {lenFollowing}
                  </p>
                  <p className="text-muted-text">Following</p>
                </div>
                <div>
                  <p className="font-bold text-accent text-xl">
                    {userPosts?.length || 0}
                  </p>
                  <p className="text-muted-text">Posts</p>
                </div>
              </div>

              <div className="relative flex justify-center">
                <div className="w-32 h-32 md:w-48 md:h-48 bg-accent bg-opacity-20 rounded-full flex items-center justify-center text-accent mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 md:h-24 md:w-24"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {profileData?._id !== user?.result?._id &&
                user?.result &&
                profileData?.name && (
                  <div className="flex justify-center mt-4 md:mt-0">
                    <button
                      disabled={!user?.result}
                      onClick={handleFollowUser}
                      className="bg-accent hover:bg-accent-hover text-main-text py-2 px-6 rounded-lg font-medium transition"
                    >
                      {profileData?.followers?.includes(user?.result?._id)
                        ? "Unfollow"
                        : "Follow"}
                    </button>
                  </div>
                )}
            </div>

            <div className="mt-16 text-center border-b border-muted-text pb-8">
              <h1 className="text-3xl font-bold text-accent">
                {profileData.name || "Deleted User"}
              </h1>
              <p className="text-muted-text mt-2">{profileData.email}</p>
            </div>

            <div className="mt-10">
              <p className="text-accent text-xl text-center font-medium mb-6">
                Posts by {profileData.name || "Deleted User"}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userPosts?.map((post) => (
                  <div key={post._id}>
                    <Post post={post} setCurrentId={setCurrentId} />
                  </div>
                ))}
                {profileData?._id === user?.result?._id && profileData.name && (
                  <Form currentId={currentId} setCurrentId={setCurrentId} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {profileData?._id === user?.result?._id && user?.result && (
        <div className="w-full flex justify-center my-10">
          <div className="bg-secondary rounded-xl shadow-lg p-6 w-full max-w-md">
            <div className="px-5 py-7 w-full">
              <label className="font-semibold text-lg text-center text-red-400 pb-3 block">
                Danger Zone
              </label>
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-500 hover:bg-red-600 text-main-text py-2 px-6 rounded-lg font-medium transition"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

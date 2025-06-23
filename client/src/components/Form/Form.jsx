import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    link: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", message: "", tags: "", link: "" });
  };

  if (!user?.result?.name) {
    return (
      <div className="w-full flex justify-center py-10">
        <div className="bg-[#1e1e1e] md:w-full md:max-w-md max-w-sm flex px-4 mt-10 shadow-2xl rounded-xl">
          <div className="px-5 py-7 w-full">
            <h1 className="font-semibold text-sm text-[#cccccc] pb-1">
              Please Sign In to Like, Create Posts, and Follow Users
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col justify-end sm:py-12"
      >
        <div className="p-10 xs:p-0 mx-auto shadow-2xl md:w-full md:max-w-md max-w-sm">
          <div className="bg-[#1e1e1e] shadow w-full rounded-lg divide-y divide-[#333]">
            <div className="px-5 py-7">
              <label className="font-bold text-lg text-[#f5f5f5] pb-5 block">
                {currentId ? `Editing "${post?.title}"` : "Create a Post"}
              </label>

              <label className="font-semibold text-sm text-[#cccccc] pb-1 block">
                Title
              </label>
              <input
                name="title"
                type="text"
                className="bg-[#121212] text-[#f5f5f5] border border-[#4db6ac] rounded-lg px-3 py-2 mb-5 w-full"
                value={postData.title}
                onChange={(e) =>
                  setPostData({ ...postData, title: e.target.value })
                }
              />

              <label className="font-semibold text-sm text-[#cccccc] pb-1 block">
                Message
              </label>
              <input
                name="message"
                type="text"
                className="bg-[#121212] text-[#f5f5f5] border border-[#4db6ac] rounded-lg px-3 py-2 mb-5 w-full"
                value={postData.message}
                onChange={(e) =>
                  setPostData({ ...postData, message: e.target.value })
                }
              />

              <label className="font-semibold text-sm text-[#cccccc] pb-1 block">
                Tags
              </label>
              <input
                name="tags"
                type="text"
                className="bg-[#121212] text-[#f5f5f5] border border-[#4db6ac] rounded-lg px-3 py-2 mb-5 w-full"
                value={postData.tags}
                onChange={(e) =>
                  setPostData({ ...postData, tags: e.target.value.split(",") })
                }
              />

              <label className="font-semibold text-sm text-[#cccccc] pb-1 block">
                Link
              </label>
              <input
                name="link"
                type="text"
                className="bg-[#121212] text-[#f5f5f5] border border-[#4db6ac] rounded-lg px-3 py-2 mb-5 w-full"
                value={postData.link}
                onChange={(e) =>
                  setPostData({ ...postData, link: e.target.value })
                }
              />
            </div>

            <div className="py-5 px-5">
              <button
                type="submit"
                className="transition duration-200 bg-[#4db6ac] hover:bg-[#26a69a] text-[#121212] w-full py-2.5 rounded-lg text-sm font-semibold"
              >
                Submit
              </button>
            </div>

            <div className="py-5 px-5">
              <button
                type="button"
                onClick={clear}
                className="transition duration-200 bg-[#4db6ac] hover:bg-[#26a69a] text-[#121212] w-full py-2.5 rounded-lg text-sm font-semibold"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;

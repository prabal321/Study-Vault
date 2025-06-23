import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/posts";
import { useParams } from "react-router-dom";
import { getPost } from "../../actions/posts";
import moment from "moment";

const Comments = ({ post }) => {
  const [comments, setComments] = useState([post?.comments]);
  const dispatch = useDispatch();
  const [com, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const commentsRef = useRef();

  const handleComment = async (e) => {
    e.preventDefault();
    if (com.trim() === "") return;
    const newComments = await dispatch(
      commentPost(user?.result?.name, com, post._id)
    );
    setComment("");
    setComments(newComments);
  };

  const handleRefresh = () => window.location.reload();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  return (
    <section className="bg-primary py-8 lg:py-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-center mb-5">
          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-main-text bg-accent rounded-lg hover:bg-accent-hover transition"
          >
            Refresh Comments
          </button>
        </div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-accent">
            Discussion ({post?.comments?.length})
          </h2>
        </div>

        {user?.result ? (
          <form className="mb-6" onSubmit={handleComment}>
            <div className="py-2 px-4 mb-4 bg-secondary rounded-lg border border-smoke">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows="6"
                value={com}
                onChange={(e) => setComment(e.target.value)}
                className="px-0 w-full text-sm text-main-text border-0 focus:ring-0 focus:outline-none bg-secondary placeholder-muted-text"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-main-text bg-accent rounded-lg hover:bg-accent-hover transition"
            >
              Post comment
            </button>
          </form>
        ) : (
          <p className="inline-flex items-center mr-3 text-sm text-muted-text">
            Please Sign in to comment
          </p>
        )}

        {comments.length > 0 &&
          comments?.map((commentArray, index) => (
            <div key={index}>
              {commentArray?.map((commentObj, innerIndex) => (
                <div key={innerIndex}>
                  <article className="p-6 mb-6 text-base bg-secondary rounded-lg">
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-smoke rounded-full">
                          <span className="font-medium text-muted-text">
                            {commentObj.commenter[0]}
                          </span>
                        </span>
                        <span className="ml-2 text-main-text">
                          {commentObj.commenter}
                        </span>
                      </div>
                      <p className="text-sm text-muted-text">
                        {moment(commentObj.timeAt).fromNow()}
                      </p>
                    </footer>
                    <p className="text-main-text">{commentObj.comment}</p>
                  </article>
                  {innerIndex !== commentArray.length - 1 && (
                    <hr className="border-smoke" />
                  )}
                </div>
              ))}
            </div>
          ))}
      </div>
    </section>
  );
};

export default Comments;

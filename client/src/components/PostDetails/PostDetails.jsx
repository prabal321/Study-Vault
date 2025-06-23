import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import moment from "moment";
import { getPost, getPostsBySearch, likePost } from "../../actions/posts";
import Comments from "./Comments";

const PostDetails = () => {
  const { post, posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post, dispatch]);

  if (!post)
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <span className="text-main-text text-xl">Loading...</span>
      </div>
    );

  const recommendedPosts = posts?.filter(({ _id }) => _id !== post._id);

  return (
    <div className="min-h-screen bg-primary pb-10">
      <div className="flex justify-center pt-10">
        <div className="bg-secondary rounded-xl shadow-lg p-8 w-full max-w-2xl">
          <h1 className="text-3xl font-extrabold text-accent mb-2">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-accent bg-opacity-20 text-accent px-3 py-1 rounded-full text-xs font-semibold"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center mb-4">
            <span className="text-accent font-semibold mr-2">
              By {post.name}
            </span>
            <span className="text-muted-text text-sm">
              • {moment(post.createdAt).fromNow()}
            </span>
          </div>
          <p className="text-main-text mb-6">{post.message}</p>
          {post.link && (
            <div className="mb-6">
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent hover:bg-accent-hover text-main-text font-semibold px-6 py-2 rounded transition"
              >
                Resource Link
              </a>
            </div>
          )}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => dispatch(likePost(post._id))}
              disabled={!user?.result}
              className="bg-accent hover:bg-accent-hover text-primary font-semibold px-4 py-2 rounded transition disabled:opacity-60"
            >
              {post.likes?.length || 0} Like
              {post.likes?.length === 1 ? "" : "s"}
            </button>
            <span className="text-muted-text text-sm">
              {post.likes?.length > 0
                ? "People like this post"
                : "Be the first to like!"}
            </span>
          </div>
        </div>
      </div>

      {/* Recommended Posts */}
      {recommendedPosts && recommendedPosts.length > 0 && (
        <div className="flex flex-col items-center mt-12">
          <h2 className="text-2xl font-bold text-accent mb-6">
            Recommended Posts
          </h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {recommendedPosts.map((rec) => (
              <div
                key={rec._id}
                className="bg-secondary rounded-xl shadow p-6 w-72 flex flex-col"
              >
                <h3 className="text-accent font-bold text-lg mb-2">
                  {rec.title}
                </h3>
                <div className="flex flex-wrap gap-1 mb-2">
                  {rec.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-accent bg-opacity-20 text-accent px-2 py-0.5 rounded-full text-xs font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <p className="text-muted-text text-sm mb-2">By {rec.name}</p>
                <button
                  onClick={() => navigate(`/posts/${rec._id}`)}
                  className="bg-accent hover:bg-accent-hover text-main-text font-semibold px-4 py-2 rounded transition mt-auto"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comments */}
      <div className="mt-12">
        <Comments post={post} />
      </div>
    </div>
  );
};

export default PostDetails;

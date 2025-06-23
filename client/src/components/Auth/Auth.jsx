import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
import logo from "../../assets/EN_logo.png"; // Replace with Study Vault logo if available
import { Link } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [requestStatus, setRequestStatus] = useState({
    loading: false,
    error: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRequestStatus({ loading: true, error: null });

    try {
      if (isSignup) {
        await dispatch(signup(formData, navigate));
      } else {
        await dispatch(signin(formData, navigate));
      }
      setRequestStatus({ loading: false, error: null });
    } catch (error) {
      setRequestStatus({
        loading: false,
        error: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup((prev) => !prev);
    setRequestStatus({ loading: false, error: null });
  };

  return (
    <form
      className="min-h-screen bg-[#121212] flex flex-col justify-center sm:py-12 px-4"
      onSubmit={handleSubmit}
    >
      <div className="mx-auto md:w-full md:max-w-md">
        <div className="mb-5 flex justify-center items-center">
          <Link to="/posts" className="flex items-center gap-3">
            <img
              src={logo}
              alt="logo"
              className="w-10 h-10 object-contain rounded-full"
            />
            <p className="text-[#f5f5f5] text-2xl font-semibold">Study Vault</p>
          </Link>
        </div>

        <div className="bg-[#1e1e1e] shadow-lg rounded-lg divide-y divide-[#333]">
          <div className="px-5 py-7">
            {isSignup && (
              <>
                <label className="text-sm text-[#cccccc] pb-1 block">
                  First Name
                </label>
                <input
                  name="firstName"
                  onChange={handleChange}
                  required
                  type="text"
                  className="bg-[#121212] text-[#f5f5f5] border border-[#4db6ac] rounded-lg px-3 py-2 mb-5 w-full"
                />

                <label className="text-sm text-[#cccccc] pb-1 block">
                  Last Name
                </label>
                <input
                  name="lastName"
                  onChange={handleChange}
                  required
                  type="text"
                  className="bg-[#121212] text-[#f5f5f5] border border-[#4db6ac] rounded-lg px-3 py-2 mb-5 w-full"
                />
              </>
            )}

            <label className="text-sm text-[#cccccc] pb-1 block">E-mail</label>
            <input
              name="email"
              onChange={handleChange}
              required
              type="email"
              className="bg-[#121212] text-[#f5f5f5] border border-[#4db6ac] rounded-lg px-3 py-2 mb-5 w-full"
            />

            <label className="text-sm text-[#cccccc] pb-1 block">
              Password
            </label>
            <input
              name="password"
              onChange={handleChange}
              required
              type="password"
              className="bg-[#121212] text-[#f5f5f5] border border-[#4db6ac] rounded-lg px-3 py-2 mb-5 w-full"
            />

            {isSignup && (
              <>
                <label className="text-sm text-[#cccccc] pb-1 block">
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  onChange={handleChange}
                  required
                  type="password"
                  className="bg-[#121212] text-[#f5f5f5] border border-[#4db6ac] rounded-lg px-3 py-2 mb-5 w-full"
                />
              </>
            )}
          </div>

          {error && (
            <div className="text-center text-red-400 text-sm px-5 py-2">
              {error}
            </div>
          )}
          {requestStatus.error && (
            <div className="text-center text-red-500 text-sm px-5 py-2">
              {requestStatus.error}
            </div>
          )}

          <div className="py-5 px-5">
            <button
              onClick={handleSubmit}
              type="submit"
              className="transition duration-200 bg-[#4db6ac] hover:bg-[#26a69a] text-[#121212] w-full py-2.5 rounded-lg text-sm font-semibold"
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </button>
          </div>

          <div className="py-5 px-5">
            <button
              type="button"
              onClick={switchMode}
              className="transition duration-200 bg-[#1e1e1e] hover:bg-[#333] border border-[#4db6ac] text-[#4db6ac] w-full py-2.5 rounded-lg text-sm font-semibold"
            >
              {isSignup
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>

        <div className="py-5 text-center">
          <Link to="/posts">
            <button className="transition duration-200 text-[#cccccc] hover:text-[#4db6ac] text-sm">
              ← Back to Posts
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Auth;

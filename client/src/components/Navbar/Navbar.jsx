import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/EN_logo.png"; // Replace with Study Vault logo if available
import pologo from "../../assets/p_icon.png";
import * as actionType from "../../constants/actionTypes";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const realUser = JSON.parse(localStorage.getItem("profile"));

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate("/posts");
    setUser(null);
    window.location.reload();
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <nav className="bg-[#121212] w-full flex justify-between items-center px-8 h-20">
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/posts" className="flex items-center gap-2">
          <img
            src={logo}
            alt="logo"
            className="w-9 h-9 object-contain rounded-full"
          />
          <p className="text-[#f5f5f5] text-[25px] font-semibold cursor-pointer hidden sm:block">
            Study Vault &nbsp;
          </p>
        </Link>
      </div>

      <div className="mt-2">
        {user?.result ? (
          <div className="flex items-center gap-4">
            <Link to={`/profile/${realUser?.result?._id}`} className="w-9 h-9">
              <img
                src={pologo}
                alt="profile icon"
                className="rounded-full object-contain"
              />
            </Link>

            <button
              type="button"
              onClick={logout}
              className="bg-[#4db6ac] hover:bg-[#26a69a] text-[#121212] font-medium rounded-full text-sm px-5 py-2.5 text-center transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/auth">
            <button
              type="button"
              className="bg-[#4db6ac] hover:bg-[#26a69a] text-[#121212] font-medium rounded-full text-sm px-5 py-2.5 text-center transition duration-200"
            >
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

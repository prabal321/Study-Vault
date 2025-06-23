import React from "react";
import logo from "../../assets/EN_logo.png"; // Replace with StudyVault logo if available
import { Link } from "react-router-dom";

const StartPage = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <div className="bg-[#121212] min-h-screen flex justify-center items-center">
      <div className="p-8 w-full max-w-4xl">
        <div className="p-8 bg-[#1e1e1e] shadow-lg rounded-xl">
          <div className="flex justify-center">
            <img
              src={logo}
              alt="logo"
              className="h-[100px] object-contain rounded-full"
            />
          </div>

          <div className="mt-10 text-center border-b border-[#4db6ac] pb-6">
            <h1 className="text-4xl font-bold text-[#f5f5f5]">Study Vault</h1>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center">
            <p className="text-[#cccccc] text-center font-light lg:px-10">
              Welcome to Study Vault – your digital vault for curated study
              resources. Whether you're cramming for exams or looking to
              strengthen your understanding, Study Vault provides a centralized
              platform for discovering, sharing, and accessing high-quality
              academic materials across various subjects. Learn smarter, not
              harder.
            </p>

            {!user?.result ? (
              <div>
                <div className="flex mt-16 justify-center">
                  <Link to="/auth">
                    <button
                      type="button"
                      className="bg-[#4db6ac] hover:bg-[#26a69a] text-[#121212] font-semibold rounded-full text-sm px-6 py-2.5 transition duration-200"
                    >
                      Get Started
                    </button>
                  </Link>
                </div>
                <Link to="/posts">
                  <h1 className="text-[#cccccc] mt-7 hover:underline hover:text-[#4db6ac] text-sm text-center transition duration-150">
                    No, Take Me To Posts Without Sign In
                  </h1>
                </Link>
              </div>
            ) : (
              <Link to="/posts">
                <h1 className="text-[#cccccc] mt-7 hover:underline hover:text-[#4db6ac] text-sm text-center transition duration-150">
                  Take Me To Posts
                </h1>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;

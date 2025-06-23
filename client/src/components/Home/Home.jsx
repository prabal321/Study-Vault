import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Paginate from "../../pagination";
import ChipInput from "material-ui-chip-input";
import Footer from "../Footer/Footer";
import "../SearchSection.css"; // <-- Corrected import

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState(0);
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState("");

  const handleAddChip = (tag) => setTags([...tags, tag]);
  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const searchPost = () => {
    if (search.trim() || tags.length) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  return (
    <div className="bg-[#121212] min-h-screen justify-center text-[#f5f5f5]">
      <Navbar />

      {/* Search Section */}
      <div className="w-full flex justify-center">
        <div className="bg-[#1e1e1e] md:w-full md:max-w-md max-w-sm flex px-4 mt-10 shadow-2xl rounded-xl">
          <div className="px-5 py-7 w-full">
            {/* Search Bar */}
            <label className="font-semibold text-sm text-[#cccccc] pb-1 block">
              Search by Title
            </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyPress}
              name="search"
              placeholder="Search for Titles"
              type="text"
              className="bg-[#121212] text-[#f5f5f5] border border-[#cccccc] rounded-lg px-3 py-4 mt-1 mb-5 text-sm w-full"
            />

            {/* Search Tags */}
            <label className="font-semibold text-sm text-[#cccccc] pb-1 block mt-4">
              Search by Tags
            </label>
            <ChipInput
              className="w-full chipinput-dark"
              value={tags}
              onAdd={handleAddChip}
              onDelete={handleDeleteChip}
              placeholder="Type tags here..."
              fullWidth
              style={{
                backgroundColor: "#121212",
                color: "#f5f5f5",
                border: "1px solid #cccccc",
                borderRadius: "8px",
                padding: "14px 12px",
                fontSize: "14px",
                marginBottom: "20px",
              }}
              inputProps={{
                style: {
                  color: "#f5f5f5",
                  backgroundColor: "#121212",
                  fontSize: "14px",
                  border: "none",
                  outline: "none",
                  caretColor: "#f5f5f5",
                },
                spellCheck: false,
              }}
              inputStyle={{
                color: "#f5f5f5",
              }}
            />

            {/* Search Button */}
            <div className="py-5 px-5">
              <button
                onClick={searchPost}
                type="button"
                className="transition duration-200 bg-[#4db6ac] hover:bg-[#26a69a] text-[#121212] w-full py-2.5 rounded-lg text-sm font-semibold"
              >
                <span className="inline-block mr-2">Search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {!searchQuery && !tags.length && (
        <div className="w-full flex justify-center">
          <div className="bg-[#1e1e1e] md:w-full md:max-w-md max-w-sm flex px-4 mt-10 shadow-2xl rounded-xl">
            <div className="px-5 py-7 w-full items-center">
              <Paginate page={page} />
            </div>
          </div>
        </div>
      )}

      {/* Posts and Form */}
      <div className="container mx-auto mt-10 px-4">
        <Posts setCurrentId={setCurrentId} />
        <Form currentId={currentId} setCurrentId={setCurrentId} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;

"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/slice";
import CardPost from "../components/card-post";
import SearchBar from "../components/input-search";
import AddPostModal from "../components/create-post-modal";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegPlusSquare } from "react-icons/fa";

const POSTS_PER_PAGE = 9;

const App = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPosts, setNewPosts] = useState([]);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    } else {
      console.log(posts);
    }
  }, [dispatch, posts.length]);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  const displayPosts = searchQuery ? filteredPosts : [...newPosts, ...posts];

  const currentPosts = displayPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPaginationRange = () => {
    const range = [];
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, currentPage + 1);

    if (end - start < 2) {
      if (start === 1) {
        end = Math.min(3, totalPages);
      } else if (end === totalPages) {
        start = Math.max(1, totalPages - 2);
      }
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  const paginationRange = getPaginationRange();

  const handleSavePost = (newPost) => {
    setNewPosts([newPost, ...newPosts]);
    toast.success("New post added successfully!");
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold mb-4 px-20">Posts</h1>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Add Post Button */}
        <div className="mb-4 flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 flex items-center gap-3 bg-black ms-auto mr-20 text-white rounded"
          >
            Add Post
            <FaRegPlusSquare />
          </button>
        </div>

        {loading && (
          <AiOutlineLoading3Quarters
            size={32}
            className="flex text-center mx-auto justify-center animate-spin"
          />
        )}
        {error && <p className="text-red-500 flex justify-center">{error}</p>}

        <div className="mt-10 mb-4 flex flex-wrap gap-y-10 justify-center gap-x-20">
          {currentPosts.map((post, index) => (
            <CardPost
              key={post.id}
              id={post.id}
              index={index}
              title={post.title}
            />
          ))}
        </div>

        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
          >
            Previous
          </button>

          {paginationRange.map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-4 py-2 rounded ${
                currentPage === page ? "bg-black text-white" : "bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>

      {/* Add Post Modal */}
      <AddPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePost}
      />
    </>
  );
};

export default App;

"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { fetchPosts } from "@/store/slice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const DetailPost = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts]);

  const post = posts.find((p) => p.id === Number(id));

  if (loading) {
    return (
      <div className="text-center text-lg">
        <AiOutlineLoading3Quarters className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!post) {
    return <div className="text-center text-gray-500">Post not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <button
        className="mt-6 bg-black text-white py-2 px-4 rounded hover:bg-black transition-colors"
        onClick={() => router.push("/")}
      >
        Back to Posts
      </button>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4 text-black">{post.title}</h1>
        <p className="text-gray-700 text-lg">{post.body}</p>
      </div>
    </div>
  );
};

export default DetailPost;

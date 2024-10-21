"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
const CardPost = ({ title, index, id }) => {
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    const colors = ["#abc4ff", "#66CDAA", "#9cadce", "#40E0D0"];

    const colorForPost = colors[index % colors.length];
    setBgColor(colorForPost);
  }, [index]);

  return (
    <div className="border-2 p-2 border-gray-200 flex flex-col justify-between rounded-lg w-[400px] h-60">
      <h1
        className="font-bold text-2xl pt-5 rounded-lg text-white h-full px-5"
        style={{ backgroundColor: bgColor }}
      >
        {title}
      </h1>

      <div className="border-t-2 pt-3">
        <Link href={`/detail-post/${id}`}>
          <button className="bg-black w-full mt-2 rounded-lg text-white px-4 py-2 font-semibold">
            Detail Posts
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardPost;

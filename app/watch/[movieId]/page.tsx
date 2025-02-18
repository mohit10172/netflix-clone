"use client";

import useMovie from "@/app/hooks/useMovie";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Watch = ({ params }: { params: Promise<{ movieId: string }> }) => {
  const { movieId } = use(params);
  const router = useRouter();
  const { data } = useMovie(movieId);

  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    const handleMouseMove = () => {
      setShowNav(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setShowNav(false);
      }, 2500); // Adjust the delay time as needed (5000ms = 5 seconds)
    };

    let timer = setTimeout(() => {
      setShowNav(false);
    }, 2500); // Initial delay

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-black">
      <nav
        className={`fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70 transition-opacity duration-200 ${
          showNav ? "opacity-100" : "opacity-0"
        }`}
      >
        <AiOutlineArrowLeft
          onClick={() => router.push("/")}
          className="text-white cursor-pointer"
          size={40}
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light mr-2">Watching:</span>
          {data?.title}
        </p>
      </nav>
      <video
        autoPlay
        controls
        className="h-full w-full"
        src={data?.videoUrl}
      ></video>
    </div>
  );
};

export default Watch;

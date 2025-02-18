"use client";

import { useSession } from "next-auth/react";

// COMPONENTS
import Navbar from "../components/Navbar";
import Billboard from "../components/Billboard";
import MovieList from "../components/MovieList";
import useMovieList from "./hooks/useMovieList";
import useFavorites from "./hooks/useFavorites";
import InfoModal from "../components/InfoModal";
import useInfoModal from "./hooks/useInfoModal";

export default function Home() {
  const { data: session, status } = useSession();
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    if (typeof window !== "undefined") {
      window.location.href = "/auth";
    }
    return null;
  }

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList data={movies} title="Trending Now" />
        <MovieList data={favorites} title="My List" />
      </div>
    </>
  );
}

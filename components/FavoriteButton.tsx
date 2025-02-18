import axios from "axios";
import React, { useCallback, useMemo } from "react";

import useCurrentUser from "@/app/hooks/useCurrentUser";
import useFavorites from "@/app/hooks/useFavorites";

import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutatefavorites } = useFavorites();
  const { data: currUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currUser, movieId]);

  const togglefavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete("/api/favorite", { data: { movieId } });
    } else {
      response = await axios.post("/api/favorite", { movieId });
    }

    const updatedfavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currUser,
      favoriteIds: updatedfavoriteIds,
    });

    mutatefavorites();
  }, [movieId, isFavorite, currUser, mutate, mutatefavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={togglefavorites}
      className="
            cursor-pointer
            group/item
            w-6
            h-6
            lg:w-10
            lg:h-10
            border-white
            border-2
            rounded-full
            flex
            justify-center
            items-center
            transition
            hover:border-neutral-300
        "
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavoriteButton;

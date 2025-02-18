import { without } from "lodash";
import prismadb from '../../lib/prismadb';
import { serverAuth } from "@/app/lib/serverAuth";

export async function POST(req: Request) {
    try {
        const { currUser } = await serverAuth();
    
        const { movieId } = await req.json();

        const existingMovie = await prismadb.movie.findUnique({
            where: {
                id: movieId,
            }
        });

        if(!existingMovie) {
            throw new Error('Invalid ID!');
        }

        const user = await prismadb.user.update({
            where: {
                email: currUser.email || '',
            },
            data: {
                favoriteIds: {
                    push: movieId,
                }
            }
        });

        return new Response(JSON.stringify(user), {
            headers: { "Content-Type": "application/json" },
            status: 200
        });

    } catch (error) {
        console.log(error);
        return new Response(null,{
            status: 400
        });
    }
}

export async function DELETE(req: Request) {
    try {
        const { currUser } = await serverAuth();

        const { movieId } = await req.json();

        const existingMovie = await prismadb.movie.findUnique({
            where: {
                id: movieId,
            }
        });

        if(!existingMovie) {
            throw new Error('Invalid ID!');
        }

        const updatedfavoriteIds = without(currUser.favoriteIds, movieId);

        const updatedUser = await prismadb.user.update({
            where: {
                email: currUser.email || '',
            },
            data: {
                favoriteIds: updatedfavoriteIds
            }
        });

        return new Response(JSON.stringify(updatedUser), {
            headers: { "Content-Type": "application/json" },
            status: 200
        });


    } catch (error) {
        console.log(error);
        return new Response(null, {
            status: 400
        });
    }
}
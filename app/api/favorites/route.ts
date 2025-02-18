import prismadb from '../../lib/prismadb';
import { serverAuth } from '@/app/lib/serverAuth';

export async function GET() {
    try {
        const { currUser } = await serverAuth();

        const favoriteMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: currUser?.favoriteIds,
                }
            }
        });

        return new Response(JSON.stringify(favoriteMovies), {
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
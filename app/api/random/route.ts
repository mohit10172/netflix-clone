import { serverAuth } from "../../lib/serverAuth";
import prismadb from '../../lib/prismadb';

export async function GET() {
    try {
        await serverAuth();

        const movieCount = await prismadb.movie.count();
        const randomIndex = Math.floor(Math.random() * movieCount);

        const randomMovies = await prismadb.movie.findMany({
            take: 1,
            skip: randomIndex
        });

        return new Response(JSON.stringify(randomMovies[0]), {
            headers: { "Content-Type": "application/json" },
            status: 200
        });
    } catch (error) {
        console.log(error);
        return new Response(null, {
            status: 400
        })
    }
}
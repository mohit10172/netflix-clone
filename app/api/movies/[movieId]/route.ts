import { serverAuth } from '@/app/lib/serverAuth';
import prismadb from '../../../lib/prismadb';

export async function GET(
    _req: Request, 
    { params }: { params: Promise<{movieId: string}>}
) {
    try {
        await serverAuth();

        const { movieId } = await params;        

        if(typeof movieId != 'string') {
            throw new Error('Invalid ID!');
        }

        if(!movieId) {
            throw new Error('Invalid ID!');
        }

        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        });

        if(!movie) {
            throw new Error('Movie not found!');
        }

        return new Response(JSON.stringify(movie), {
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
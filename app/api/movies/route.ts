import prismadb from '../../lib/prismadb';
import { serverAuth } from "@/app/lib/serverAuth";

export async function GET() {
    try {
        await serverAuth();

        const movies = await prismadb.movie.findMany();

        return new Response(JSON.stringify(movies), {
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
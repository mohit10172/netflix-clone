import { serverAuth } from "../../lib/serverAuth";

export async function GET() {
    try {
        const { currUser } = await serverAuth();

        return new Response(JSON.stringify(currUser), {
            headers: { "Content-Type": "application/json" },
            status: 201
        });
    } catch (error) {
        console.log(error);
        return new Response(null, {
            status: 400
        });
    }
}
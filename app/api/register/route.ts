import bcrypt from 'bcrypt';
import prismadb from '../../lib/prismadb';

export async function POST(req: Request) {
    try {
        const { email, name, pswd } = await req.json();

        const existingUser = await prismadb.user.findUnique({
            where: {
                email,
            }
        })

        if(existingUser) {
            return new Response(JSON.stringify({ error: 'Email is already taken!' }), {
                headers: { "Content-Type": "application/json" },
                status: 422
            });
        }

        const hashedPassword = await bcrypt.hash(pswd, 12);

        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            }
        });

        return new Response(JSON.stringify(user), {
            headers: { "Content-Type": "application/json" },
            status: 201
        });

    } catch (error) {
        console.log(error);
        new Response(null, {
            status: 422
        });
    }
}
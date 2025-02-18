import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prismadb from "../lib/prismadb";

export const serverAuth = async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        throw new Error("Not signed in!");
    }

    const currUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        },
    });

    if (!currUser) {
        throw new Error("Not signed in!");
    }

    return { currUser };
};

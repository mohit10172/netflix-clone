import { getServerSession } from "next-auth";
import prismadb from "../lib/prismadb";
import { authOptions } from "./authOptions";

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

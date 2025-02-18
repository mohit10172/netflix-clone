import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prismadb from './prismadb';
import { compare } from "bcrypt";
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const {
    GITHUB_ID,
    GITHUB_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    NEXTAUTH_JWT_SECRET,
    NEXTAUTH_SECRET,
    NODE_ENV
} = process.env;

if (!GITHUB_ID || !GITHUB_SECRET) {
    throw new Error('Missing GitHub OAuth environment variables');
}

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error('Missing Google OAuth environment variables');
}

if (!NEXTAUTH_JWT_SECRET || !NEXTAUTH_SECRET) {
    throw new Error('Missing NextAuth secret environment variables');
}

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: GITHUB_ID,
            clientSecret: GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text'
                },
                pswd: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.pswd) {
                    throw new Error('Email and password required!');
                }

                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user || !user.hashedPassword) {
                    throw new Error('Email does not exist!');
                }

                const isCorrectPass = await compare(
                    credentials.pswd,
                    user.hashedPassword
                );

                if (!isCorrectPass) {
                    throw new Error('Incorrect password!');
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: '/auth'
    },
    debug: NODE_ENV === 'development',
    adapter: PrismaAdapter(prismadb),
    session: {
        strategy: 'jwt'
    },
    jwt: {
        secret: NEXTAUTH_JWT_SECRET
    },
    secret: NEXTAUTH_SECRET
};
import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/prisma/client";
import { db } from "@/lib/db";
import { compare } from "bcrypt";

export const authOptions = {
    adapter: PrismaAdapter(db),
    name:"credentials",
    session:{
        strategy: 'jwt'
    },
    pages:{
        signIn:'/signin',
        signOut:'/signOut',
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email"},
                password: { label: "Password", type: "password", placeholder: "Парола"}
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("No credentials provided");
                }
            
                const existingUser = await prisma.employee.findUnique({
                    where: { email: credentials.email }
                });
            
                if (!existingUser) {
                    throw new Error("User not found");
                }
            
                const passwordMatch = await compare(credentials.password, existingUser.password);
            
                if (!passwordMatch) {
                    throw new Error("Incorrect password");
                }
            
                return {
                    id: existingUser.id,
                    email: existingUser.email,
                    password: existingUser.password,
                    isAdmin: existingUser.isAdmin, 
                };
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
} 

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}


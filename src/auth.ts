import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Googleq from "next-auth/providers/google";

export const {handlers, auth, signIn, signOut} = 
    NextAuth({
        providers: [
            Credentials({
                name: "Credentials",
                    credentials: {
                         email: { label: "Email", type: "text"},
                         password: { label: "Password", type: "password"}
            },
                async authorize(credentials) {
                    if(credentials?.email === "test@test.com" && 
                        credentials?.password === "1111") {
                            return {
                             id: "1", name: "tester", email: "test@test.com"
                        }
                    }
                    return null
            }
            })
           
        ],
        pages: {
            signIn: '/login',
        },
        session: { strategy: "jwt"}
    })
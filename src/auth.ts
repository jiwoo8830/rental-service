import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";


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
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    const res = await fetch("http://13.125.229.197:8080/api/users/login", {
                        method: 'POST',
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                        headers: { "Content-Type": "application/json" }
                    });

                    const user = await res.json();

                    if (res.ok && user) {
                        return {
                            id: user.id || user.userId || "1",
                            name: user.name || user.nickname || "User",
                            email: user.email,
                        };
                    }
                    return null;
                } catch (error) {
                    console.error("Login Error:", error);
                    return null;
                }
            }
            })
           
        ],
        pages: {
            signIn: '/login',
        },
        session: { strategy: "jwt"}
    })
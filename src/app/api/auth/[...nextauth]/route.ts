import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLEINT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                if (credentials?.email === "test@test.com" && credentials?.password === "1111") {
                    return {id: "1", name: "tester", email: "test@test.com"}
                }
                return null
            }
        })
    ],
    pages: {
        signIn: '/login',
    }
})

export { handler as GET, handler as POST}
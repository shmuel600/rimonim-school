import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import User from "@/models/user";

console.log(process.env.GOOGLE_ID);
export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        // ...add more providers here
    ],
    theme: {
        colorScheme: "dark",
    },
    // callbacks: {
    //     async jwt({ token }) {
    //         token.userRole = "settings";
    //         return token;
    //     },
    // },
    secret: process.env.NEXTAUTH_SECRET
})
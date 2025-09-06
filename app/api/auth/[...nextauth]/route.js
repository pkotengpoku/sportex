import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// You can add more providers like GitHub, Credentials, etc.

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Required for JWT encryption
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

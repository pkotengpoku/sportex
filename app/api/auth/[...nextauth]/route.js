import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// You can add more providers like GitHub, Credentials, etc.

import User from "@/models/User";


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Required for JWT encryption
  // Add this callback to your NextAuth options
callbacks: {
    async signIn({ user, account, profile, isNewUser }) {
      // The `isNewUser` property is the key to this logic.
      if (isNewUser) {
        try {
          // Assuming you have a Mongoose model named 'User'
          const newUser = new User({
            name: user.name,
            email: user.email,
            image: user.image,
            // Set a default role for the new user
            role: 'user', 
            // Add any other custom data from the 'profile' object here
            // e.g., if you need provider-specific data like Google's ID
            // googleId: profile.sub 
          });

          await newUser.save();
          console.log('New user created and saved to MongoDB.');
          
        } catch (error) {
          console.error('Error saving new user to database:', error);
          // Return false to prevent the sign-in from completing if there's a database error
          return false;
        }
      }
      // Return true to allow the sign-in process to continue
      return true;
    },
}
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

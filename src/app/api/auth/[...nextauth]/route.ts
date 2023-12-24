import userModel from "@/libs/models/User";
import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoDBConnection";
import DBConnect from "@/libs/mongoDBConntect";
import { compare } from "@/libs/hashAndCompare";

export const authOption = {
  secret: process.env.AUTH_KEY,
  adapter: MongoDBAdapter(clientPromise),
  

  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      id: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },


      async authorize(credentials: any, req) {
        await DBConnect()
        const { email, password } = credentials;

        //check email
        const user = await userModel.findOne({ email });
        if(!user) return Response.json({success:false,message:"Wrong Email Or Password"})
        // console.log(user);
      
        //check password
        const isPasswordMatch = compare({plainText:password,hashValue:user.password})
        console.log(isPasswordMatch);
        if(isPasswordMatch){
          return user
        }
        return null
      },
    }),
  ],
  session:{
    strategy: "jwt" as const
  }
  ,
  callbacks:{
    async jwt({token,user}:any) {
      if(user){
        token.role = user.role
        token.imageUrl = user.profileImage
        token.name = user.name
      }
      return token
    },
    async session({session,token}:any) {
        if(session?.user){
          session.user.role = token.role
          session.user.id = token.sub
          session.user.imageUrl = token.imageUrl
          session.user.name = token.name
        }
      return session
    }
  },
  
  
};

const handler = nextAuth(authOption);

export { handler as GET, handler as POST };


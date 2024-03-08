import { LoginService } from "@/services/auth/service";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import moment from "moment";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 1000 * 60,
  },
  secret: process.env.SECRET_KEY,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await LoginService({ email });

        if (user) {
          const confirmPassword = await compare(password, user.password);
          if (confirmPassword) {
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      return { ...token, ...user };
      // console.log(token);

      // if (account?.providers === "credentials") {
      //   token.email = user.email;
      //   token.firstname = user.firstname;
      //   token.lastname = user.lastname;
      //   token.role = user.role;
      // }

      // return token;
    },
    async session({ session, token }: any) {
      let newToken: any = { ...token };

      if ("email" in newToken) {
        session.user.email = newToken.email;
      }
      if ("firstname" in newToken) {
        session.user.firstname = newToken.firstname;
      }
      if ("lastname" in newToken) {
        session.user.lastname = newToken.lastname;
      }
      // if ("role" in token) {
      //   session.user.role = token.role;
      // }
      
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

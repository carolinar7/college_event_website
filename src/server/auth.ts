import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
  type DefaultUser,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "~/server/db";
import { url } from "~/helper";
import axios from 'axios';
import { type User, type Role } from "@prisma/client";
import bcrypt from 'bcryptjs';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      fName?: string;
      lName?: string;
      email?: string;
      role?: Role;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    fName?: string;
    lName?: string;
    role?: Role;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text"},
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {username: string, password: string};
        return axios.get(`${url}/user`, {
          params: {
            username: username
          }
        }).then(({ data }: { data: User }) => {
        if (data && bcrypt.compareSync(password, data.password)) {
          return data;
        }
        return null;
        }).catch(() => {
          console.log('Error: failed user lookup');
          return null;
        });
      }
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.fName = user.fName;
        token.lName = user.lName;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.fName = token.fName as (string | undefined);
        session.user.lName = token.lName as (string | undefined);
        session.user.email = token.email as (string | undefined);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        session.user.role = token.role as (Role | undefined);
      }
      return session;
    }
  }
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

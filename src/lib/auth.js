import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";

export const providers = ["Google", "GitHub"];

const getOrCreateUser = async ({ email, name, picture }) => {
  const include = {
    role: {
      include: {
        permissions: {
          select: {
            id: true,
          },
        },
      },
    },
  };

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include,
    });

    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          picture,
          role_id: "cm5lqyxv40000krjcaj6d0n2v",
        },
        include,
      });

      return newUser;
    }

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const profileCallback = async (profile) => {
  const { email, name, picture, avatar_url } = profile;
  const profile_pic = picture || avatar_url;
  const user = await getOrCreateUser({ email, name, picture: profile_pic });
  if (user) {
    profile.role = user.role.name;
    profile.permissions = user.role.permissions.map(
      (permission) => permission.id,
    );
  }
  return profile;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        return await profileCallback(profile);
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      async profile(profile) {
        return await profileCallback(profile);
      },
    }),
  ],
  session: {
    maxAge: 60 * 60 * 24, // 24 hours
    updateAge: 60 * 60 * 4, // every 4 hours
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.permissions = user.permissions;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      session.user.permissions = token.permissions;
      return session;
    },
  },
});

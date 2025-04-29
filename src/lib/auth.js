import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";

export const providers = ["Google", "GitHub"];

const createUserAssociations = async (user_id) => {
  const allWorlds = await prisma.world.findMany({
    include: {
      prerequisites: true,
      levels: {
        include: {
          prerequisites: true,
        },
      },
    },
  });

  const userLevelData = [];
  const userWorldData = allWorlds.map((world) => {
    const { id: world_id, prerequisites } = world;
    const unlocked = prerequisites.length === 0;

    world.levels.map((level) => {
      const { id: level_id, prerequisites } = level;
      const levelUnlocked = unlocked && prerequisites.length === 0;

      userLevelData.push({
        user_id,
        level_id,
        unlocked: levelUnlocked,
      });
    });

    return {
      user_id,
      world_id,
      unlocked,
    };
  });

  await prisma.user_World.createMany({
    data: userWorldData,
  });
  await prisma.user_Level.createMany({
    data: userLevelData,
  });
};

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

  const user = await prisma.user.findUnique({
    where: { email },
    include,
  });

  if (!user) {
    const { id: role_id } = await prisma.role.upsert({
      where: { name: "user" },
      update: {},
      create: {
        name: "user",
      },
    });

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        picture,
        role_id,
      },
      include,
    });

    await createUserAssociations(newUser.id);

    return newUser;
  }

  return user;
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
    profile.picture = user.picture;
    profile.db_id = user.id;
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
        token.picture = user.picture;
        token.db_id = user.db_id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      session.user.permissions = token.permissions;
      session.user.image = token.picture;
      session.user.id = token.db_id;
      return session;
    },
  },
});

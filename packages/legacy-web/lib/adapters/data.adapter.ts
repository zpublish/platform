import { Adapter, AdapterAccount } from 'next-auth/adapters';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
// import { PrismaClient, Prisma } from "@prisma/client"


import { prisma } from '../prisma';

export default function DataAdapter(/*client, */options = {}): Adapter {
    return {
      createUser: (data) => prisma.user.create({ data }),
      getUser: (id) => prisma.user.findUnique({ where: { id } }),
      getUserByEmail: (email) => prisma.user.findUnique({ where: { email } }),
      async getUserByAccount(provider_providerAccountId) {
        const account = await prisma.account.findUnique({
          where: { provider_providerAccountId },
          select: { user: true },
        })
        return account?.user ?? null
      },
      updateUser: ({ id, ...data }) => prisma.user.update({ where: { id }, data }),
      deleteUser: (id) => prisma.user.delete({ where: { id } }),
      linkAccount: (data) =>
        prisma.account.create({ data }) as unknown as AdapterAccount,
      unlinkAccount: (provider_providerAccountId) =>
        prisma.account.delete({
          where: { provider_providerAccountId },
        }) as unknown as AdapterAccount,
      async getSessionAndUser(sessionToken) {
        const userAndSession = await prisma.session.findUnique({
          where: { sessionToken },
          include: { user: true },
        })
        if (!userAndSession) return null
        const { user, ...session } = userAndSession
        return { user, session }
      },
      createSession: (data) => prisma.session.create({ data }),
      updateSession: (data) =>
        prisma.session.update({ where: { sessionToken: data.sessionToken }, data }),
      deleteSession: (sessionToken) =>
        prisma.session.delete({ where: { sessionToken } }),
      async createVerificationToken(data) {
        const verificationToken = await prisma.verificationToken.create({ data })
        if ((verificationToken as any).id) delete (verificationToken as any).id
        return verificationToken
      },
      async useVerificationToken(identifier_token) {
        try {
          const verificationToken = await prisma.verificationToken.delete({
            where: { identifier_token },
          })
          // @ts-expect-errors // MongoDB needs an ID, but we don't
          if (verificationToken.id) delete verificationToken.id
          return verificationToken
        } catch (error) {
          // If token already used/deleted, just return null
          // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
          if ((error as PrismaClientKnownRequestError).code === "P2025")
            return null
          throw error
        }
      },
    }
  }

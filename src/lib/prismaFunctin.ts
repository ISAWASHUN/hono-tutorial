

export const getPrisma = (databe_url: string) => {
  const prisma = new PrismaClient({
    datasourceUrl: databe_url,
  }).$extends(withAccelerate())
  return prisma
}

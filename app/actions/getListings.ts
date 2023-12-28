import prisma from "@/app/libs/prismadb"

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        ceratedAt: "desc",
      },
    })
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.ceratedAt.toISOString(),
    }))
    return safeListings
  } catch (error: any) {
    throw new Error(error)
  }
}

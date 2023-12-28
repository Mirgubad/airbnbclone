import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import getListings from "./actions/getListings";
import ListingCard from "./components/Listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";


export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div className="
        pt-24
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-4
        2xl:grid-cols-4
        gap-8
        ">

          {listings.map((listing) => {
            return (
              <div className="pt-4">
                <ListingCard
                  key={listing.id}
                  currentUser={currentUser}
                  data={listing}
                />
              </div>
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  )
}

"use client"

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeReservations, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/Listings/ListingCard";

interface PropertiesClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings,
    currentUser
}) => {

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        axios.delete(`/api/listings/${id}`)
            .then(() => {
                toast.success("Listing deleted")
                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error)

            }).finally(() => {
                setDeletingId("");
            })
    }, [router])


    return (
        <Container>
            <div className="pt-4">
                <Heading
                    title="Properties"
                    subtitle="List of your properties"
                />
            </div>
            <div
                className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-4
            2xl:grid-cols-4
            gap-8
                "

            >
                {listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        onAction={onCancel}
                        disabled={deletingId === listing.id}
                        actionLabel="Delete property"
                        currentUser={currentUser}
                    />
                ))}

            </div>
        </Container>

    );
}

export default PropertiesClient;
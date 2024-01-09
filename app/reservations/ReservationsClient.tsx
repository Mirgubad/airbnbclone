"use client"

import { toast } from "react-hot-toast"
import axios from 'axios'
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"

import { SafeReservations, SafeUser } from "../types"


import Heading from "../components/Heading"
import Container from "../components/Container"
import ListingCard from "../components/Listings/ListingCard"


interface ReservationsClientProps {
    reservations: SafeReservations[];
    currentUser?: SafeUser | null
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');


    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success("Reservation cancelled");
                router.refresh();
            })
            .catch(() => {
                toast.error("Something went wrong.");
            })
            .finally(() => {
                setDeletingId("");
            })

    }, [router])


    return (
        <Container>
            <div className="pt-4">
                <Heading
                    title="Reservations"
                    subtitle="Bookings on your properties"
                />
            </div>

            <div
                className="mt-10
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
                {reservations.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel guset reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )

}


export default ReservationsClient
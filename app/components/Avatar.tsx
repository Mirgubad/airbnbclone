"use client"
import Image from "next/image"
import avatarImage from "../../public/Images/avatar.svg"

interface AvatarProps {
    src?: string | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({
    src
}) => {
    return (
        <Image
            className="rounded-full"
            height="32"
            width="32"
            alt="Avatar"
            src={src || avatarImage}

        />
    )
}

export default Avatar
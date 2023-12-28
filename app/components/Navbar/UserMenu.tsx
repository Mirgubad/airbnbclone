"use client"
import React, { useState, useRef, useEffect, useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { TbWorld } from "react-icons/tb"
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModel";
import useLoginModal from "@/app/hooks/useLoginModel";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";

interface UserMenuProps {

    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const useClickOutside = (ref: React.RefObject<HTMLDivElement>, callback: () => void) => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        useEffect(() => {
            document.addEventListener("click", handleClickOutside);

            return () => {
                document.removeEventListener("click", handleClickOutside);
            };
        }, [ref, callback]);
    };

    const handleCloseMenu = () => {
        setIsOpen(false);
    };

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        rentModal.onOpen()


    }, [currentUser, loginModal, rentModal])

    const menuRef = useRef<HTMLDivElement>(null);
    useClickOutside(menuRef, handleCloseMenu);

    return (
        <div ref={menuRef} className="relative">
            <div className="flex flex-row items-center gap-2">
                <div
                    onClick={onRent}
                    className="hidden md:block text-sm font-semibold py-2 px-3 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                >
                    Airbnb your home
                </div>
                <div
                    onClick={() => { }}
                    className="hidden md:block text-sm font-semibold py-2 px-3 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                >
                    <TbWorld color="#222222" size="18" />
                </div>
                <div
                    onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40wv] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">

                        {
                            currentUser ? (
                                <>
                                    <MenuItem onClick={() => { }} label="My trips" />
                                    <MenuItem onClick={() => { }} label="My favorites" />
                                    <MenuItem onClick={() => { }} label="My reservations" />
                                    <MenuItem onClick={() => { }} label="My properties" />
                                    <MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
                                    <hr />
                                    <MenuItem onClick={() => signOut()} label="Logout" />
                                </>
                            )
                                : (
                                    <>
                                        <MenuItem onClick={loginModal.onOpen} label="Login" />
                                        <MenuItem onClick={registerModal.onOpen} label="Sign up" />
                                    </>
                                )

                        }

                    </div>
                </div>
            )
            }
        </div >
    );
};

export default UserMenu;

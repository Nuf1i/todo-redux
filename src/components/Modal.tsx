"use client"

import React from "react";
import { BsXLg } from 'react-icons/bs'

interface Props {
    children: React.ReactNode,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Modal({ children, setShowModal }: Props) {
    return (
        <>
            <div className="fixed inset-0 z-50 flex justify-center mx-4 overflow-x-hidden overflow-y-auto outline-none lg:mx-0">
                <div className="relative flex flex-col w-full max-w-lg mx-auto rounded-md mt-[11%] lg:max-w-lg bg-gray-100 h-fit border border-gray-600">
                    <BsXLg
                        onClick={() => setShowModal(false)}
                        className="absolute top-1.5 z-50 bg-red-600 text-white text-lg rounded-md p-0.5 duration-100 cursor-pointer hover:scale-110 h-fit w-fit left-2"
                    />
                    {children}
                </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black bg-opacity-50"></div>
        </>
    );
}
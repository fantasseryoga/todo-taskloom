import React from "react";
import '../styles/navbar.scss'
import { useAuth } from "../hooks/auth.hook";
import { useSelector } from "react-redux";

export const Navbar = () => {
    const { logout } = useAuth()
    const isAuthenticated = useSelector(state => state.isAuthenticated)

    return (
        <nav class="bg-gray-800 navbar">
            <div class=" px-2 sm:px-6 lg:px-8 pt-5">
                <div class="relative flex items-center justify-between">
                    <div class="flex flex-1 items-center justify-center">
                        <div class="flex justify-between onehp">
                            {
                                isAuthenticated ?
                                    <>
                                        <a href="/create" class="gradient-bg-txt rounded-md px-3 py-2 text-sm font-medium">CreateTask</a>
                                        <a href="/" class="gradient-bg-txt-logo py-2 text-sm font-medium">Task Loom</a>
                                        <a href="#" onClick={logout} class="gradient-bg-txt py-2 text-sm font-medium">Logout</a>
                                    </>
                                    :
                                    <>
                                        <a href="/" class="gradient-bg-txt rounded-md px-3 py-2 text-sm font-medium">Login</a>
                                        <a href="#" class="gradient-bg-txt-logo py-2 text-sm font-medium">Task Loom</a>
                                        <a href="/register" class="gradient-bg-txt py-2 text-sm font-medium">Sign Up</a>
                                    </>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
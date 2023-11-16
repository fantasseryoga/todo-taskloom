import React from "react"
import styles from "../index.css"
import "../styles/auth.scss"
import { Navbar } from "../components/Navbar"

export const LoginPage = () => {
    return (
        <>
            < Navbar />
            <div className="container log">
                <div className="login-form-cnt">
                    <h1 className="welcome-back-text">Welcome back!</h1>
                    <div className="fields-cn my-10">
                        <label class="block font-bold login-input-label mb-2" for="username">
                            Username
                        </label>
                        <input className="w-full login-input py-2" id="username" type="text" placeholder="Type here" />
                        <label class="block login-input-label font-bold mb-2 mt-12" for="password">
                            Password
                        </label>
                        <input className="w-full login-input py-2" id="password" type="password" placeholder="Type here"></input>
                    </div>
                    <button class="font-bold py-2 px-9 px-4 log-in-btn">
                        Log In
                    </button>
                </div>
            </div>
            <br/>
        </>
    )
}
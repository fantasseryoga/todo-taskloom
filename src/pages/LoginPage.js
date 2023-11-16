import { React } from "react"
import styles from "../index.css"
import "../styles/auth.scss"
import { Navbar } from "../components/Navbar"
import { useState } from "react"
import { useHttp } from "../hooks/http.hook"

export const LoginPage = () => {
    const { loading, request } = useHttp()
    const [formErrors, setFormErrors] = useState([])
    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async () => {
        if (form.username === '' || form.password === '') {
            setFormErrors(['Invalid Credentials'])
            return
        }
        try {
            const response = await request("/user-login", "POST", { ...form })
            if (response.status === 400) {
                const data = await response.json()
                setFormErrors(data.errors.map(el => el.msg))
            }

            if (response.status === 200) {
                const data = await response.json()

                // login(data.access_token, data.user.name)
                console.log(data)
                setFormErrors([])
            }

        }
        catch (e) {
            console.log(e)
            alert("Sorry sth went wrong, try to reload the page.")
        }
    }

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
                        <input className="w-full login-input py-2" id="username" name="username" onChange={changeHandler} type="text" placeholder="Type here" />
                        <label class="block login-input-label font-bold mb-2 mt-12" for="password">
                            Password
                        </label>
                        <input className="w-full login-input py-2" id="password" name="password" onChange={changeHandler} type="password" placeholder="Type here" />
                    </div>
                    <button class="font-bold py-2 px-9 px-4 log-in-btn" onClick={loginHandler}>
                        Log In
                    </button>
                </div>
            </div>
            <br />
        </>
    )
}
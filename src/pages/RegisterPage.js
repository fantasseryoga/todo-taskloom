import React from "react"
import { Navbar } from "../components/Navbar"
import { useState } from "react"
import "../styles/auth.scss"
import { useHttp } from "../hooks/http.hook"
import { useNavigate } from "react-router-dom"

export const RegisterPage = () => {
    const navigate = useNavigate()
    const { loading, request } = useHttp()
    const [formErrors, setFormErrors] = useState([])
    const [form, setForm] = useState({
        name: '',
        password: '',
        passwordR: ''
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            if (form.name === '' || form.password === '' || form.passwordR === '') {
                setFormErrors(["All fields are mandatory"])
                return
            } else {
                const index = formErrors.indexOf("All fields are mandatory");
                if (index > -1) {
                    formErrors.splice(index, 1);
                }
            }
            if (form.password != form.passwordR) {
                if (formErrors.includes("Password mismatch")) {
                    return
                }
                setFormErrors(["Password mismatch"])

                return
            }
            const response = await request("/user-reg", "POST", { name: form.name, password: form.password })


            if (response.status === 400) {
                const data = await response.json()
                setFormErrors(data.detail)
            }

            if (response.status === 422) {
                const data = await response.json()
                setFormErrors(data.detail.map(el => el.msg))
            }

            if (response.status === 200) {
                const data = await response.json()
                setFormErrors([])

                alert('User has been created succesfully')

                navigate('/')
            }

        }
        catch (e) {
            console.log(e)
            alert("Sorry sth went wrong, try to reload the page.")
        }
    }

    return (
        <>
            <Navbar />
            <div className="container reg">
                <div className="login-form-cnt">
                    <h1 className="welcome-back-text">Registration</h1>
                    <div className="fields-cn my-10">
                        <label class="block font-bold login-input-label mb-2" for="username">
                            Username
                        </label>
                        <input className="w-full login-input py-2" id="username" name="name" onChange={changeHandler} type="text" placeholder="Type here" />
                        <label class="block login-input-label font-bold mb-2 mt-12" for="password">
                            Password
                        </label>
                        <input className="w-full login-input py-2" id="password" name="password" onChange={changeHandler} type="password" placeholder="Type here"></input>
                        <label class="block login-input-label font-bold mb-2 mt-12" for="passwordR">
                            Repeat Password
                        </label>
                        <input className="w-full login-input py-2" id="passwordR" name="passwordR" onChange={changeHandler} type="password" placeholder="Type here"></input>
                    </div>
                    <button class="font-bold py-2 px-9 mb-4 px-4 log-in-btn" onClick={registerHandler}>
                        Register
                    </button>
                    <br />
                    {
                        formErrors.length ?
                            <span className="formErrors">*{formErrors}</span>
                            :
                            null
                    }
                </div>
            </div>
            <br />
        </>
    )
}
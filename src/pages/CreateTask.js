import { React } from "react"
import styles from "../index.css"
import "../styles/create.scss"
import { Navbar } from "../components/Navbar"
import { useState } from "react"
import { useHttp } from "../hooks/http.hook"
import { useAuth } from "../hooks/auth.hook"
import Datepicker from "tailwind-datepicker-react"

const options = {
	title: "Demo Title",
	autoHide: true,
	todayBtn: false,
	clearBtn: true,
	clearBtnText: "Clear",
	maxDate: new Date("2024-01-01"),
	minDate: new Date(),
	theme: {
		background: "",
		todayBtn: "",
		clearBtn: "",
		icons: "",
		text: "",
		disabledText: "",
		input: "",
		inputIcon: "",
		selected: "",
	},
	icons: {
		prev: () => <span>Previous</span>,
		next: () => <span>Next</span>,
	},
	datepickerClassNames: "top-12",
	defaultDate: new Date(),
	language: "en",
	disabledDates: [],
	weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
	inputNameProp: "date",
	inputIdProp: "date",
	inputPlaceholderProp: "Select Date",
	inputDateFormatProp: {
		day: "numeric",
		month: "long",
		year: "numeric"
	}
}

export const CreateTask = () => {
    const [show, setShow] = useState(false)

    const handleChange = (selectedDate) => {
		console.log(selectedDate)
	}

    const handleClose = (state) => {
		setShow(state)
	}


    return (
        <>
            < Navbar />
            <div className="container-task-cr">
                <div className="task-form">
                    <span className="create-task-text mb-5">
                        Creating a new task to get completed
                    </span>
                    <div className="my-12">
                        <label class="block font-bold login-input-label mb-2" for="title">
                            Title For A Task
                        </label>
                        <input className="w-full login-input py-2" id="title" name="title" type="text" placeholder="Type here" />
                        <label class="block font-bold login-input-label mb-2 mt-8" for="priority">
                            Priority
                        </label>
                        <input className="w-full login-input py-2" id="priority" name="priority" type="number" placeholder="Type here" />
                        <label class="block font-bold login-input-label mb-2 mt-8" for="date">
                            Date
                        </label>
                        <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} classNames="mt-8 task-datepicker" name="date"/>
                    </div>
                    <button class="font-bold py-2 px-9 mb-4 px-4 create-btn">
                        Save
                    </button>
                </div>
            </div>
        </>
    )
}
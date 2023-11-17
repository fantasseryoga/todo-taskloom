import { React } from "react"
import "../index.css"
import "../styles/create.scss"
import { Navbar } from "../components/Navbar"
import { useState } from "react"
import { useHttp } from "../hooks/http.hook"
import Datepicker from "tailwind-datepicker-react"
import { useSelector } from "react-redux"

const options = {
	title: "Demo Title",
	autoHide: true,
	todayBtn: false,
	clearBtn: false,
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
	defaultDate: null,
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

export const CreateTaskPage = () => {
    const [show, setShow] = useState(false)
	const { request } = useHttp()
	const [formErrors, setFormErrors] = useState([])
	const token = useSelector(state => state.token)
	const [task, setTask] = useState({
		title: "",
		status: "active",
		priority: 5,
		date: null
	})

    const handleChange = (selectedDate) => {
		setTask({...task, date: selectedDate})
	}

    const handleClose = (state) => {
		setShow(state)
	}

	const changeHandler = event => {
        setTask({ ...task, [event.target.name]: event.target.value })
    }

	const addTaskHandler = async () => {
        try {
            if (task.title === "" || task.priority === "") {
                setFormErrors(["All fields are Mandatory"])
                return
            }

			if (6 <= task.priority <= 0){
				setFormErrors(["Value error, Priority should be in 1-5 range"])
                return
			}
            const response = await request("/task", "POST", {...task}, { token: token })

            if (response.ok) {
                alert("Task has been created")
                setFormErrors([])
                return
            }

            if (response.status === 400) {
                const data = await response.json()
                setFormErrors(data.detail)
            }

            if (response.status === 422){
                const data = await response.json()
                setFormErrors(data.detail.map(el => el.msg))
            }

        } catch (e) {
            console.log(e)
            alert("Sorry sth went wrong, try to reload the page.")
        }
    }

	console.log(task)
    return (
        <>
            < Navbar />
            <div className="container-task-cr">
                <div className="task-form">
                    <span className="create-task-text mb-5">
                        Creating a new task to get completed
                    </span>
                    <div className="my-12">
                        <label className="block font-bold login-input-label mb-2" for="title">
                            Title For A Task
                        </label>
                        <input className="w-full login-input py-2" id="title" name="title" onChange={changeHandler} type="text" placeholder="Type here" />
                        <label className="block font-bold login-input-label mb-2 mt-8" for="priority">
                            Priority
                        </label>
                        <input className="w-full login-input py-2" id="priority" name="priority" onChange={changeHandler} type="number" placeholder="Type here" />
                        <label className="block font-bold login-input-label mb-2 mt-8" for="date">
                            Date
                        </label>
                        <Datepicker onChange={handleChange} options={options} show={show} setShow={handleClose} classNames="mt-8 task-datepicker" name="date"/>
                    </div>
                    <button onClick={addTaskHandler} className="font-bold py-2 px-9 mb-4 px-4 create-btn">
                        Save
                    </button>
					<br/>
                    {
                        formErrors.length ?
                            <span className="formErrors">*{formErrors}</span>
                            :
                            null
                    }
                </div>
            </div>
        </>
    )
}
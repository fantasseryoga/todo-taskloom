import { React } from "react"
import { useEffect } from "react"
import "../index.css"
import "../styles/task.scss"
import { Navbar } from "../components/Navbar"
import { useState } from "react"
import { useHttp } from "../hooks/http.hook"
import Datepicker from "tailwind-datepicker-react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const TaskPage = () => {
	const navigate = useNavigate()
	const [formErrors, setFormErrors] = useState([])
	const { request } = useHttp()
	const username = useSelector(state => state.userName)
	const [tasks, setTasks] = useState([])
	const token = useSelector(state => state.token)
	const [form, setForm] = useState({
		title: '',
		status: ""
	})

	const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
		console.log(form)
    }

	useEffect(() => {
		try {
			request("/tasks-by-user", "POST", { ...form }, { token: token }).then(response => {
				if (response.status === 400) {
					return
				}

				return response

			}).then(data => data.json()).then(tasks => {
				console.log(tasks)
				setTasks(tasks)
			})
		} catch (e) {
			console.log(e)
			alert("Sorry sth went wrong, try to reload the page.")
		}
	}, [request, form])

	return (
		<>
			< Navbar />
			<div className="container">
				<div className="search-section flex justify-between">
					<div className="search-texts">
						<h2 className="hello-user-text">
							Hello, {username}
						</h2>
						<br />
						<span className="moti-text-search">
							You have a plenty of things to do!
						</span>
					</div>
					<div className="search-fields-cnt">
						<div className="flex mb-5">
							<input type="search" id="default-search" className="block w-full p-4 text-sm title-search" name="title" onChange={changeHandler} placeholder="Search" required />
							<button className="font-bold py-2 px-9 ml-5 px-4 add-btn" onClick={() => {navigate('/create')}}>
								ADD
							</button>
						</div>
						<div className="flex gap-3 justify-between">
							<button className={form.status === "" ? "font-bold py-2 px-9 px-4 status-btn active" : "font-bold py-2 px-9 px-4 status-btn"} name="status" onClick={changeHandler} value={""}>
								All
							</button>
							<button className={form.status === "active" ? "font-bold py-2 px-9 px-4 status-btn active" : "font-bold py-2 px-9 px-4 status-btn"} name="status" onClick={changeHandler} value={"active"}>
								Active
							</button>
							<button className={form.status === "done" ? "font-bold py-2 px-9 px-4 status-btn active" : "font-bold py-2 px-9 px-4 status-btn"} name="status" onClick={changeHandler} value={"done"}>
								Done
							</button>
							<button className={form.status === "failed" ? "font-bold py-2 px-9 px-4 status-btn active" : "font-bold py-2 px-9 px-4 status-btn"} name="status" onClick={changeHandler} value={"failed"}>
								Undone
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="container tasks-container mt-10">
				{
					tasks.map(task => {
						return (
							<div className="task flex mb-6 justify-between items-center">
								<div className="flex">
									<div className="task-priority">
										{task.priority}
									</div>
									<div className="task-titles ml-10">
										<span className="task-title">{task.title}</span>
										<br />
										<span className="task-date">{task.date.slice(0, 10)}</span>
									</div>
								</div>
								<div className="action-buttons flex">
									<button class="font-bold py-2 px-9 px-4 action-btn mr-2">
										<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
											<rect x="0.566229" y="0.566229" width="33.8675" height="33.8675" rx="8.21317" stroke="url(#paint0_linear_461_283)" stroke-width="1.13246" />
											<path d="M10.6519 18.3878L15.9194 22.8262L24.3475 12.1741" stroke="#F2767D" stroke-width="1.52174" />
											<defs>
												<linearGradient id="paint0_linear_461_283" x1="-7.81046e-09" y1="17.0395" x2="35.0005" y2="17.4551" gradientUnits="userSpaceOnUse">
													<stop stop-color="#EE4D5F" />
													<stop offset="1" stop-color="#FFCFA5" />
												</linearGradient>
											</defs>
										</svg>
									</button>
									<button class="font-bold py-2 px-9 px-4 action-btn delete-btn-svg mr-2">
										<svg className="delete-btn-svg" xmlns="http://www.w3.org/2000/svg" width="36" height="35" viewBox="0 0 36 35" fill="none">
											<rect x="0.824463" y="0.5" width="34" height="34" rx="8.2794" stroke="url(#paint0_linear_461_285)" />
											<path d="M12.4985 12.1741L24.6724 22.8262" stroke="#F2767D" stroke-width="1.52174" />
											<path d="M24.6724 12.1741L12.4985 22.8262" stroke="#F2767D" stroke-width="1.52174" />
											<defs>
												<linearGradient id="paint0_linear_461_285" x1="0.324463" y1="17.0395" x2="35.325" y2="17.4551" gradientUnits="userSpaceOnUse">
													<stop stop-color="#EE4D5F" />
													<stop offset="1" stop-color="#FFCFA5" />
												</linearGradient>
											</defs>
										</svg>
									</button>
									<button className="font-bold py-2 px-9 px-4 action-btn-delete">
										Delete
									</button>
								</div>
							</div>
						)
					})
				}
			</div>
		</>
	)
}
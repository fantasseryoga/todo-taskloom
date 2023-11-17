import { React } from "react"
import { useEffect } from "react"
import { Navbar } from "../components/Navbar"
import { useState } from "react"
import { useHttp } from "../hooks/http.hook"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/auth.hook"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck, faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import "../styles/task.scss"
import "../index.css"


export const TaskPage = () => {
	const { logout } = useAuth()
	const navigate = useNavigate()
	const { request } = useHttp()
	const username = useSelector(state => state.userName)
	const [tasks, setTasks] = useState([])
	const token = useSelector(state => state.token)
	const [form, setForm] = useState({
		title: "",
		status: ""
	})

	const changeHandler = event => {
		setForm({ ...form, [event.target.name]: event.target.value })
		console.log(form)
	}

	const changeStatus = async (event) => {
		try {
			const newStatus = event.currentTarget.name
			const taskID = event.currentTarget.id

			const response = await request("/task", "PUT", { status: newStatus, taskId: taskID }, { token: token })

			if (response.status === 200) {
				if (form.status === "" && newStatus !== "deleted") {
					setTasks(tasks.map(el => {
						if (el.id === taskID) el.status = newStatus

						return el
					}))
				} else {
					setTasks(tasks.filter(item => item.id !== taskID))
				}

			}

			if (response.status === 400) {
				alert("Seems like you don't have a permission to change status of this item")
				return
			}

			return
		} catch (e) {
			console.log(e)
			alert("Sorry sth went wrong, try to reload the page.")
		}
	}

	useEffect(() => {
		const controller = new AbortController()
		try {
			request("task/tasks-by-user", "POST", { ...form }, { token: token }, controller.signal).then(response => {
				if (controller.signal.aborted) {
					throw "Aborted"
				}
				if (response.status === 400) {
					logout()
				}

				if (response.status === 403) {
					logout()
				}

				return response

			}).then(data => data.json()).then(tasks => {
				console.log(tasks)
				setTasks(tasks)
			}).catch(e => console.log(e))
		} catch (e) {
			console.log(e)
			alert("Sorry sth went wrong, try to reload the page.")
		}

		return () => controller.abort()
	}, [request, form, token, logout])

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
							<button className="font-bold py-2 px-9 ml-5 px-4 add-btn" onClick={() => { navigate('/create') }}>
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
					tasks.length ?
						tasks.map(task => {
							return (
								<div key={task.id} className={task.status === "done" ? "done-task task flex mb-6 justify-between items-center" : "task flex mb-6 justify-between items-center"}>
									<div className="flex">
										<div className="task-priority">
											{
												task.status === "active"
													?
													task.priority
													:
													task.status === "failed"
														?
														"FAILED"
														:
														"DONE"

											}
										</div>
										<div className="task-titles ml-10">
											<span className="task-title">{task.title}</span>
											<br />
											<span className="task-date">{task.date.slice(0, 10)}</span>
										</div>
									</div>
									<div className="action-buttons flex">
										<button className="font-bold py-2 px-9 px-4 action-btn mr-2" id={task.id} onClick={changeStatus} name="done">
											<FontAwesomeIcon className="btn-svg" icon={faSquareCheck} />
										</button>
										<button className="font-bold py-2 px-9 px-4 action-btn delete-btn-svg mr-2" id={task.id} name="failed" onClick={changeStatus}>
											<FontAwesomeIcon className="btn-svg" icon={faSquareXmark} />
										</button>
										<button className="font-bold py-2 px-9 px-4 action-btn-delete" name="deleted" id={task.id} onClick={changeStatus}>
											Delete
										</button>
									</div>
								</div>
							)
						})
						:
						<h1 className="no-tasks-text">No tasks here</h1>
				}
			</div>
		</>
	)
}
import React from 'react'
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { Routes, Route, Navigate } from 'react-router-dom'
import { CreateTaskPage } from './pages/CreateTaskPage';
import { TaskPage } from './pages/TasksPage';


export const useRoutes = isAuthenticated => {

    if (isAuthenticated) {
        return (
            <Routes>
                <Route exact path="/" element={<TaskPage />} />
                <Route path="/create" element={<CreateTaskPage />} />
                <Route path="*" element={<Navigate to='/' />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to='/' />} />
        </Routes>
    )
}
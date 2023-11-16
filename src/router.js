import React from 'react'
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { Routes, Route, Navigate } from 'react-router-dom'


export const useRoutes = isAuthenticated => {

    if (isAuthenticated) {
        return (
            <Routes>
                
                {/* <Route path="/add-advertisement" element={<AddAdvertisementPage />} /> */}
                {/* <Route path="*" element={<Navigate to='/advertisements-list' />} /> */}
            </Routes>
        )
    }

    return (
        <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* <Route path="*" element={<Navigate to='/' />} /> */}
        </Routes>
    )
}
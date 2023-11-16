import { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useAuth = () => {
    const dispatch = useDispatch()
    
    const login = useCallback((jwt, name) => {
        dispatch({type: "SET_TOKEN", payload: jwt})
        dispatch({type: "SET_USER_NAME", payload: name})
        dispatch({type: "SET_AUTH", payload: true})
        localStorage.setItem("token", jwt)
        localStorage.setItem("username", name)
    }, [])

    const logout = useCallback(() => {
        dispatch({type: "SET_TOKEN", payload: null})
        dispatch({type: "SET_USER_NAME", payload: null})
        dispatch({type: "SET_AUTH", payload: false})
        alert("Succesfully loged out")
        localStorage.removeItem("token")
        localStorage.removeItem("username")
    }, [])

    return { login, logout }
}
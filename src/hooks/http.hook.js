import { useState, useCallback } from 'react'
import { useAuth } from './auth.hook'


export const useHttp = () => {
    const {logout} = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}, signal = null) => {
        setLoading(true)

        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
                headers['Accept'] = 'application/json'
            }

            const response = await fetch(url, { method, body, headers, signal })

            setLoading(false)

            if (response.status === 403 || response.status === 401) {
                logout()
            }

            return response
        } catch (e) {
            setLoading(false)
            setError(e.message)
        }
    }, [])

    const clearError = useCallback(() => setError(null))

    return { loading, request, error, clearError }
}
import React, { createContext, useEffect, useState } from 'react'

export const userDataContext = createContext()

function UserContext({ children }) {
    const [userData, setUserData] = useState(null)

    // On mount, restore session from localStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem('onecart_user')
            if (stored) {
                setUserData(JSON.parse(stored))
            }
        } catch {
            setUserData(null)
        }
    }, [])

    const value = {
        userData,
        setUserData,
    }

    return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    )
}

export default UserContext

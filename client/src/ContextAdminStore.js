import React, { useState, useEffect, useMemo } from 'react';
// import { useCookies } from 'react-cookie'
export const Context = React.createContext();

export const ContextAdminStore = ({ children }) => {
    let initialValue = null;
    // const [cookies, setCookie, removeCookie] = useCookies(['USER_SESSION']);
    const [adminData, setAdminData] = useState(initialValue)
    
    useEffect(() => {
        //if (cookies.USER_SESSION) {
            fetch(`/auth/getAdmin`).then(res => res.json())
                .then(res => {
                    return setAdminData(res.user)
                })
        //}
    }, [])

    // console.log(userData)
    const providerValue = useMemo(() => ({ adminData, setAdminData }), [adminData, setAdminData])

    return (
        <Context.Provider value={providerValue}>
            {children}
        </Context.Provider>
    )
}
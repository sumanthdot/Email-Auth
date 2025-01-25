/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify';


// eslint-disable-next-line react-refresh/only-export-components
export const AppContent = createContext()


export const AppContextProvider = (props)=>{

    axios.defaults.withCredentials=true;

    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [userData,setUserData] = useState(false)



    const getAuthState = async()=>{
        try {
            const {data} = await axios.get(backendURL+ '/api/auth/is-auth')
            
            if (data.success) {
                setIsLoggedIn(true)
                getUserData()
            }            
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getUserData = async()=>{
        try {
            const {data}  =await axios.get(backendURL + '/api/user/data')
            data.success ? setUserData(data.userData) : toast.error(data.message)
                        
        } catch (error) {
            toast.error(error.message)
        }
    }


    useEffect(()=>{
        getAuthState();
    },[])


    const value = {
        backendURL,
        isLoggedIn,setIsLoggedIn,
        userData,setUserData,
        getUserData

    }

        return (
            <AppContent.Provider value={value}>
                {props.children}
            </AppContent.Provider>
        )
}
import { createContext, useState, useContext, useEffect } from 'react'
import { registerRequest, loginRequest, verifyTokenRequest } from "../Api/auth";
import Cookie from "js-cookie";


export const AuthContext = createContext()


export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within an authProvider")
    return context
}

export const AuthProvider = ({ children }) => {

    const [user, setuser] = useState(null)
    const [isAuthenticated, setisAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setloading] = useState(true)

    const signUp = async (user) => {
        try {
            const res = await registerRequest(user)
            console.log(res.data)
            setuser(res.data)
            setisAuthenticated(true)
        } catch (error) {
            console.log(error.response)
            setErrors(error.response.data)

        }
    }

    const signIn = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log(res)
            setisAuthenticated(true)
            setuser(res.data)
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors(error.response.data.message)
        }

    }


    const logOut = () => {
        Cookie.remove("token")
        setisAuthenticated(false)
        setuser(null)
    }


    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000);
            return () => clearTimeout(timer)
        }
    }, [errors])


    

    useEffect(() => {

        async function checkLogin() {

            const cookies = Cookie.get()

            if (!cookies.token) {
                setisAuthenticated(false)
                setloading(false)
                return setuser(null)
            }
                try {
                    const res = await verifyTokenRequest(cookies.token)
                    if (!res.data){
                        setisAuthenticated(false)
                        setloading(false)    
                        return

                    }
                    setisAuthenticated(true)
                    setuser(res.data)
                    setloading(false)
                } catch (error) {
                    console.log(error)
                    setisAuthenticated(false)
                    setuser(null)
                    setloading(false)
                }

        }
        checkLogin()

    }, [])


    return (
        <AuthContext.Provider value={{
            signUp,
            signIn,
            loading,
            user,
            isAuthenticated,
            errors,
            logOut
        }}>

            {children}

        </AuthContext.Provider>
    )
}
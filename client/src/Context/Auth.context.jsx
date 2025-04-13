import { createContext, useState, useContext, useEffect } from 'react'
import { registerRequest, loginRequest } from "../Api/auth";

export const AuthContext = createContext()


export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) throw new Error("useAuth must be used within an authProvider")
        return context
}

export const AuthProvider = ({ children }) => {

    const [user, setuser] = useState(null)
    const [isAuthenticated, setisAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])

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
            console.log(error)
            setErrors(error.response.data)
        }
      
    }

    useEffect(() => {
        if(errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000);
            return () =>clearTimeout(timer)
        }
    }, [errors])


    return (
        <AuthContext.Provider value={{
            signUp,
            signIn,
            user,
            isAuthenticated,
            errors
        }}>

            {children}

        </AuthContext.Provider>
    )
}
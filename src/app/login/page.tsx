"use client"
import React, {useEffect} from "react"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast/headless"

export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        password: "",
        email: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(true)
    const [loading, setLoading] = React.useState(false)

    const onLogin = async() =>{
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("Login Success")
            toast.success("Login Successfully")
            router.push("/profile")
        } catch (error: any) {
            console.log("Login Failed")
            toast.error("Login Failed", error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true)
        }
    }, [user])
    


    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing": "Login"}</h1>
            <hr />
            <label>
                email
            </label>
            <input
                className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) =>setUser((prevState)=> ({...prevState ,  email : e.target.value}))}
                placeholder="email"
            />
            <label>
                password
            </label>
            <input
                className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) =>setUser((prevState)=> ({...prevState ,  password : e.target.value}))}
                placeholder="password"
            />
            <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                Login Here
            </button>
            <Link href='/signup'>Visit Signup Page</Link>
        </div>
    )
}
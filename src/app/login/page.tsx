'use client'

import Link from "next/link"
import { signIn } from 'next-auth/react'
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login() {
    
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [error, setError] = useState("")
        
        const router = useRouter()

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault()

            setError("")

            const result = await signIn("credentials", {
                email: email,
                password: password,
                redirect: false,
                callbackUrl: "/",
            })
            
            if (result?.error) {
                setError("이메일 또는 비밀번호가 일치하지 않습니다.")
            } else {
                router.push("/")
                router.refresh()
            }
        }

    
    return(

        <div className="login-container">

            <form className="login-box">
                <div className="login-box-1">
                    <input type="email" 
                           placeholder="이메일" 
                           value={email} 
                           onChange={(e)=> setEmail(e.target.value)} 
                           required/>
                    <input type="password" 
                           placeholder="비밀번호" 
                           value={password} 
                           onChange={(e)=> 
                           setPassword(e.target.value)}/>
                </div>
                    
                    {error &&<p className="error-message">{error}</p>}

                <button type="submit">로그인</button>
            </form>
            
            <hr />

            <button onClick={()=> signIn('google', { callbackUrl:'/'})}>구글</button>

            <div className="signup-link">
                <Link href="/signup">signup</Link>
            </div>
        </div>
    )
}
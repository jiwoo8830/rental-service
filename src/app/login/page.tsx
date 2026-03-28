'use client'

import Link from "next/link"
import { signIn } from 'next-auth/react'
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login() {
    
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [error, setError] = useState("")
        const [isLoading, setIsLoading] = useState(false)
        
        const router = useRouter()

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault()

            setError("")
            setIsLoading(true)
        try{
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
        } catch(err) {
            setError("오류 발생")
        } finally {
            setIsLoading(false)
        }
    }

    
    return(

        <div className="login-container">

            <div className="login-box">
                <h2>로그인</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-input">
                    <input type="email" 
                           placeholder="이메일" 
                           value={email} 
                           onChange={(e)=> setEmail(e.target.value)} 
                           required/>
                    <input type="password" 
                           placeholder="비밀번호" 
                           value={password} 
                           onChange={(e)=> 
                           setPassword(e.target.value)}
                           required/>
                    </div>
                
                    {error &&<p className="error-message">{error}</p>}

                <button type="submit" className="submit-btn" disabled={isLoading}>{isLoading ? "로그인 중..." : "로그인"}</button>
                </form>
            
                {/* <div className="divider">
                    <span>OR</span>
                </div>

            <button type="button" className="google-btn" onClick={()=> signIn('google', { callbackUrl:'/'})}>
                구글
            </button> */}

            <div className="signup-link">
                <Link href="/signup">signup</Link>
            </div>
          </div>
        </div>
    )
}
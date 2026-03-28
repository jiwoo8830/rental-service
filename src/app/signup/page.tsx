'use client'

import { useState } from "react"
import Link from "next/link"

export default function Signup() {
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [nickname, setNickname] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const [isCodeSent, setIsCodeSent] = useState(false)
    const [ isEmailVerified, setIsEmailVerified] = useState(false)
    const [ message, setMessage] = useState("")

    //임시 인증번호 발송 함수
    const handleSendCode = () => {
        if (!email) return alert("이메일을 입력해주세요.")
            setIsCodeSent(true)
            setMessage("인증번호가 발송되었습니다.")
    }
    //임시 인증번호 확힌 함수
    const handleVerifyCode = ()=>{
        if (code === "1234") {
            setIsEmailVerified(true)
            setMessage("이메일 인증이 완료되었습니다.")
        } else {
            setMessage("인증번호가 일치하지 않습니다.")
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!isEmailVerified) return alert("이메일 인증을 완료해주세요.")
        if (password !== confirmPassword) return alert("비밀번호가 일치하지 않습니다.")

        console.log("회원가입 중:", { email, nickname, password})
    }

    return(
        <div className="signup-container">
            <form className="signup-box" onSubmit={handleSubmit}>
                <h2>회원가입</h2>

                <div className="input-group">
                    <input type="email"
                            placeholder="이메일"
                            value={email}
                            onChange={(e)=>{
                                setEmail(e.target.value)}}
                            disabled={isEmailVerified || isCodeSent}
                            required
                        />
                        <button type="button"
                                onClick={handleSendCode}
                                disabled={isEmailVerified || isCodeSent}>
                                    {isCodeSent ? "재발송" : "인증번호 받기"}
                                </button>
                            </div>
                        {isCodeSent && !isEmailVerified && (
                            <div className="input-group">
                                <input type="text"
                                       placeholder="인증번호 6자리"
                                       value={code}
                                       onChange={(e)=>{
                                        setCode(e.target.value)}}
                                        required />
                                        <button type="button"
                                                onClick={handleVerifyCode}>확인</button>
                            </div>
                        )}

                        {message && <p className="status-message">{message}</p>}
                        <div className="info-group">
                            <input type="text"
                                   placeholder="닉네임"
                                   value={nickname}
                                   onChange={(e)=>{
                                    setNickname(e.target.value)
                                   }}
                                   required />
                             <input type="password"
                                    placeholder="비밀번호"
                                    value={password}
                                    onChange={(e)=>{
                                     setPassword(e.target.value)
                                    }}
                                    required />
                             <input type="password"
                                    placeholder="비밀번호 확인"
                                    value={confirmPassword}
                                    onChange={(e)=>{
                                     setConfirmPassword(e.target.value)
                                    }}
                                    required />
                        </div>
                            
                            <button type="submit" 
                                    className="submit-btn"
                                    disabled={!isEmailVerified}>
                                    회원가입 완료
                            </button>
                        <div className="login-link">
                                이미 계정이 있으신가요? <Link href="/login">
                                로그인
                                </Link>
                        </div>
            </form>
        </div>
    )
}
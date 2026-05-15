'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

export default function Signup() {
    const router = useRouter();
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [nickname, setNickname] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    
    // 비밀번호 보이기/숨기기 상태 추가
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [isCodeSent, setIsCodeSent] = useState(false)
    const [isEmailVerified, setIsEmailVerified] = useState(false)
    const [message, setMessage] = useState({text:"", type:""})

    const handleSendCode = async () => {
        if (!email) return alert("이메일을 입력해주세요.");
        try {
            const response = await fetch("/api/auth/email-verifications", {
                method: "POST",
                headers: { "Content-Type" : "application/json"},
                body: JSON.stringify({ email }),
            });
            if (response.ok) {
                setIsCodeSent(true);
                setCode(""); // 재발송 시 입력했던 번호 초기화
                setMessage({text:"인증번호가 발송되었습니다.", type:"success"});
            } else {
                setMessage({text:"발송에 실패했습니다.", type:"error"});
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handleVerifyCode = async ()=>{
        if (!code) return alert("코드를 입력해주세요");
        try {
            const response = await fetch("/api/auth/email-verifications-verify", {
                method: "POST",
                headers: { "Content-Type" : "application/json"},
                body: JSON.stringify({ email, code }),
            });
            if(response.ok) {
                setIsEmailVerified(true);
                setMessage({text:"인증완료", type:"success"});
            } else {
                setMessage({text:"인증실패", type:"error"});
            }
        } catch (error) {
            console.error("Error", error);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isEmailVerified) return alert("이메일 인증을 완료해주세요.")
        if (password !== confirmPassword) return alert("비밀번호가 일치하지 않습니다.")
        
        const signupData = {
            email: email,
            password: password,
            name: nickname // Swagger 명세에 맞춘 'name' 필드
        };

        console.log("회원가입 전송 데이터:", signupData);

        try {
            const response = await fetch("/api/users/register", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(signupData),
            });

            if(response.ok) {
                setMessage({text: "회원가입 성공! 로그인 페이지로 이동합니다", type:"success"});
                setTimeout(()=>{
                    router.push("/login");
                }, 1500);
            } else {
                const errorData = await response.json();
                console.error("서버 응답 에러 상세:", errorData);
                setMessage({text: errorData.message || "회원가입에 실패했습니다.", type:"error"})
            } 
        } catch (error) {
            console.error("Signup error:", error);
            setMessage({text:"서버 연결 오류가 발생했습니다.", type:"error"});
        }
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
                                disabled={isEmailVerified}>
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

                        {message.text && (<p className={`status-message ${message.type === "error" ? "text-red-500" : "text-green-600"}`}>{message.text}</p>)}
                        
                        <div className="info-group">
                            <input type="text"
                                   placeholder="닉네임"
                                   value={nickname}
                                   onChange={(e)=>{
                                    setNickname(e.target.value)
                                   }}
                                   required />
                             
                             {/* 비밀번호 입력 */}
                             <div className="password-input-wrapper">
                                <input type={showPassword ? "text" : "password"}
                                        placeholder="비밀번호"
                                        value={password}
                                        onChange={(e)=>{
                                        setPassword(e.target.value)
                                        }}
                                        required />
                                <button type="button" 
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                </button>
                             </div>

                             {/* 비밀번호 확인 입력 */}
                             <div className="password-input-wrapper">
                                <input type={showConfirmPassword ? "text" : "password"}
                                        placeholder="비밀번호 확인"
                                        value={confirmPassword}
                                        onChange={(e)=>{
                                        setConfirmPassword(e.target.value)
                                        }}
                                        required />
                                <button type="button" 
                                        className="password-toggle"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                </button>
                             </div>
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

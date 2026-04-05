# 인증 시스템 구현 로드맵 (Authentication System Roadmap)

## 📋 프로젝트 요구사항
- **로그인 페이지:**
  - 소셜 로그인 (구글)
  - 이메일 로그인
- **회원가입 페이지:**
  - 이메일 인증 (인증번호 발송 및 확인)
  - 닉네임(별명) 입력
  - 비밀번호 및 비밀번호 확인
- **내비게이션:**
  - `layout.tsx`의 `link-3` 내 'User' 클릭 시 로그인 페이지 이동
  - 로그인 페이지에서 회원가입 페이지로 이동 가능

---

## 🚀 단계별 구현 계획

### ✅ 1단계: 프로젝트 구조 설계 및 기초 작업
- [x] 인증 라이브러리 선정 (Auth.js / NextAuth.js 가이드 완료)
- [x] 페이지 라우트 폴더 구조 설계 완료

### ✅ 2단계: 레이아웃 수정 (진입점 만들기)
- [x] `src/app/layout.tsx` 내 'User' 링크 수정 방법 가이드 완료

### ✅ 3단계: 로그인 페이지 구현 (`/login`)
- [x] UI 구성 및 로직 가이드 완료 (useState, signIn 연결 등)
- [x] `src/app/page.tsx` 기반 CSS 스타일링 예시 가이드 완료
- [x] 실제 코드 적용 및 스타일링 (`login/page.tsx`, `globals.css`)
- [x] `signIn()` 함수 연결 및 테스트 완료 (`auth.ts` 구조 변경 포함)

### ✅ 4단계: 회원가입 페이지 구현 (`/signup`)
- [x] UI 구성: 이메일 인증, 닉네임, 비밀번호, 비밀번호 확인 필드 완료
- [x] 이메일 인증번호 발송/확인 UI 및 로직 가이드 완료
- [x] 클라이언트 측 유효성 검사 가이드 완료
- [x] 로그인 페이지와 동일한 톤앤매너 CSS 가이드 및 오타 수정 완료

### 🔄 5단계: 이메일 인증 로직 연동 및 회원가입 연결 (진행 중)
- [x] 프론트엔드 API 연동 (`handleSendCode`, `handleVerifyCode` 구현)
- [x] 백엔드 엔드포인트 연결 (`/api/auth/email-verifications`, `-verify`)
- [x] CORS 이슈 해결 (Next.js Rewrites 프록시 설정 적용)
- [ ] 인증 완료 후 최종 회원가입 연동 (`handleSubmit`) 👈 **다음 작업**

### 🔄 6단계: 회원가입 완료 로직 및 최종 테스트 (진행 중)
- [ ] DB 스키마 설계 (User 테이블: email, nickname, password 등)
- [ ] 비밀번호 해싱 (bcrypt) 및 회원가입 API 구현
- [ ] 최종 테스트 및 예외 처리

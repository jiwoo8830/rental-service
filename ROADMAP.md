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
- [x] **로그인 후 500 에러(S001) 해결 (NextAuth 경로 충돌 수정)**
- [x] **실제 백엔드 API 연동 (auth.ts 하드코딩 수정 완료: /api/users/login)**

### ✅ 4단계: 회원가입 페이지 구현 (`/signup`)
- [x] UI 구성: 이메일 인증, 닉네임, 비밀번호, 비밀번호 확인 필드 완료
- [x] 이메일 인증번호 발송/확인 UI 및 로직 가이드 완료
- [x] 클라이언트 측 유효성 검사 가이드 완료
- [x] 로그인 페이지와 동일한 톤앤매너 CSS 가이드 및 오타 수정 완료
- [x] **비밀번호 표시/숨기기 기능 추가 (Eye/EyeOff 아이콘 적용)**
- [x] **이메일 인증번호 재발송 로직 개선 (버튼 활성화 및 입력값 초기화)**

### ✅ 5단계: 이메일 인증 로직 연동 및 회원가입 연결 (완료)
- [x] 프론트엔드 API 연동 (`handleSendCode`, `handleVerifyCode` 구현)
- [x] 백엔드 엔드포인트 연결 (`/api/auth/email-verifications`, `-verify` 정확한 경로 수정)
- [x] CORS 이슈 해결 (Next.js Rewrites 프록시 설정 적용)
- [x] 인증 완료 후 최종 회원가입 연동 (`handleSubmit`)
- [x] **회원가입 API 경로 수정 (/api/auth/register) 및 500 에러 해결**
- [x] **이메일 중복 시 발생하는 에러(500 S001) 원인 파악 및 검증 완료**

### 🔄 7단계: 회원가입 완료 로직 및 최종 테스트 (진행 중)
- [x] DB 스키마 설계 (User 테이블: email, name, password 등)
- [ ] 로그인 후 세션 유지 및 사용자 이름 표시 오류 수정 ⬅️ NEXT PRIORITY
- [x] **물건 등록 페이지 (`/additem`) 구현 및 스타일링**
  - [x] 기본 폼 구조 및 상태(State) 정의 완료 (`title`, `description`, `price`, `location` 등)
  - [x] `useRouter` 임포트 경로 수정 (`next/navigation`)
  - [x] `price` 필드 타입 오류 해결 (`number | string` 유니온 타입 적용)
  - [x] 카테고리 선택 UI 구현
  - [x] API 연동 로직 구현 (`/api/products/register` Route Handler 및 쿠키 포워딩 적용)
  - [x] 상품 상태 선택 UI 추가 및 `additem` CSS 스타일링 적용
- [ ] 최종 테스트 및 예외 처리
- [ ] 카테고리 선택에 따른 필터링 로직 구현
- [ ] 검색어 입력에 따른 실시간/검색 필터링 구현
- [ ] 상세 페이지 연결 및 UI 스타일링 (CSS)

---
## ⚠️ 개발 원칙
- 사용자의 명시적 요청이 없는 한 코드를 직접 수정하지 않음.
- **CSS 스타일링은 무조건 별도 CSS 파일에서 코딩함 (Inline Style 지양)**

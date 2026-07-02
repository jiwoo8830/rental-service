import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } =
  NextAuth({
    providers: [
      Credentials({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            console.log("이메일/비밀번호 없음");
            return null;
          }

          try {
            const res = await fetch("http://13.125.229.197:8080/api/users/login", {
              method: "POST",
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });

            console.log("백엔드 상태코드:", res.status);

            if (!res.ok) {
              return null;
            }

            const text = await res.text();
            console.log("백엔드 원본 응답:", text);

            let result;
            try {
              result = JSON.parse(text);
            } catch (e) {
              console.error("JSON 파싱 실패:", text);
              return null;
            }

            const user = result.data;

            if (!user) {
              console.error("result.data 없음:", result);
              return null;
            }

            // 백엔드가 응답 헤더로 전달한 Set-Cookie 값(JSESSIONID 등 세션 정보)을 추출합니다.
            const backendCookie = res.headers.get("Set-Cookie") || "";

            // NextAuth 세션에 저장할 수 있도록 backendCookie를 반환 객체에 추가합니다.
            return {
              id: String(user.id),
              name: user.name,
              email: user.email,
              backendCookie: backendCookie,
            };
          } catch (error) {
            console.error("Login Error:", error);
            return null;
          }
        },
      }),
    ],
    pages: {
      signIn: "/login",
      error: "/login",
    },
    session: {
      strategy: "jwt",
    },
    callbacks: {
      // 로그인 성공 시 및 세션 검증 시 토큰에 백엔드 쿠키를 주입합니다.
      async jwt({ token, user }) {
        if (user) {
          token.backendCookie = (user as any).backendCookie; // as any 수정
        }
        return token;
      },
      // 클라이언트(프론트엔드)에서 session() 호출 시 백엔드 쿠키를 세션에 포함시킵니다.
      async session({ session, token }) {
        if (session.user) {
          (session as any).backendCookie = token.backendCookie;// as any 수정
        }
        return session;
      },
    },
    debug: true,
  });
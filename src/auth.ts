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

            const text = await res.text();

            console.log("백엔드 상태코드:", res.status);
            console.log("백엔드 원본 응답:", text);

            if (!res.ok) {
              return null;
            }

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

            return {
              id: String(user.id),
              name: user.name,
              email: user.email,
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
    debug: true,
  });
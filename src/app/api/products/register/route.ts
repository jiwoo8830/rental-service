import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  // 1. NextAuth 세션에서 백엔드 로그인 쿠키 획득
  const session = await auth();
  const backendCookie = (session as any)?.backendCookie; // as any 문제점 있음 TypeScript

  // 세션이 없거나 백엔드 쿠키가 누락된 경우 401 Unauthorized 반환
  if (!session || !backendCookie) {
    return NextResponse.json(
      { message: "로그인이 필요합니다. 세션 정보를 찾을 수 없습니다." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    // 2. 백엔드 상품 등록 API 호출 시 헤더에 JSESSIONID 등 쿠키를 수동으로 바인딩
    const response = await fetch("http://13.125.229.197:8080/api/products/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": backendCookie, // 획득해 둔 백엔드 세션 쿠키 실어서 전송
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { message: data.message || "백엔드 상품 등록에 실패했습니다." },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Route Handler - 제품 등록 오류:", error);
    return NextResponse.json(
      { message: "서버 내부 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}

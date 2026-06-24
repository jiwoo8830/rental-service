'use client'

import Link from "next/link"


export default function Myitem() {
    return(
        <div className="myitem">
            <section className="my-header">
                <h2 className="my-title">내 물건</h2>
                <div className="my-btn-container">
                    <Link href="/additem" className="my-btn">+ 물건 등록하기</Link>
                </div>
            </section>
            <section className="my-items">
                <p>내 물건이 없습니다.</p>
            </section>
        </div>
    )
}
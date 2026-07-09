'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    category: string;
}

export default function Myitem() {
    
    const { data: session, status } = useSession();
    
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const fetchMyProducts = async () => {
        if (!session?.user?.email) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/products`); // 임시로 전체 물건 목록 API 사용

            if(!response.ok) {
                throw new Error("내가 등록한 상품이 없습니다.");
            }
            const result = await response.json();
            setProducts(result.data?.content || result.data || []);  
        } catch (err: any) {
            setError(err.message || "오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (status === "authenticated") {
            fetchMyProducts();
        }
    }, [status]);

    if (status === "loading") {
        return <p className="loading-text">인증 확인 중...</p>;
    }

    if (status === "unauthenticated") {
        return <p className="error-text">로그인이 필요한 페이지입니다.</p>;
    }
    
return (
    <main className="myitem">
      <header className="my-header">
        <h2 className="my-title">내가 등록한 물건</h2>
        <div className="my-btn-container">
          <Link href="/additem" className="my-btn">물품 등록하기</Link>
        </div>
      </header>

      <section className="my-items">
        {loading && <p className="loading-text">로딩 중...</p>}
        {error && <p className="error-text">{error}</p>}
        
        {!loading && !error && products.length === 0 && (
          <p className="empty-text">아직 등록한 물품이 없습니다.</p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="item-grid">
            {products.map((item) => (
              <article key={item.id} className="item-card">
                <div className="card-img-box">
                  <img src="data:image/png;base64,..." alt={item.title} />
                </div>
                <div className="card-content">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-desription">{item.description}</p>
                  <strong className="card-price">{item.price.toLocaleString()}원 / 일</strong>
                  <div className="card-footer">
                    <span className="card-location">위치: {item.location}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
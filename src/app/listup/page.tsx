'use client'

import { useState, useEffect } from "react"
import { Search } from 'lucide-react'

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
}

export default function Listup() {

  const categories = [
    { id: 'ALL', name: '전체', icon: '💎' },
    { id: 'TOOL', name: '공구/도구', icon: '🔧' },
    { id: 'ELECTRONICS', name: '전자기기', icon: '💻' },
    { id: 'SPORTS', name: '스포츠', icon: '🚴' },
    { id: 'CAMPING', name: '캠핑', icon: '⛺' },
    { id: 'BOOKS', name: '도서', icon: '📚' },
    { id: 'ETC', name: '기타', icon: '📦' },
  ];


  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = async (categoryCode: string, keyword: string) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (categoryCode) params.append("category", categoryCode);
      if (keyword) params.append("keyword", keyword);

      const response = await fetch(`/api/products/${params.toString()}`);
      if (!response.ok) {
        throw new Error("상품 목록을 불러오지 못했습니다.");
      }
      const result = await response.json();
      setProducts(result.data?.content || []);
    } catch (err: any) {
      setError(err.message || "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchProducts(selectedCategory, searchQuery);
  }, [selectedCategory, searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchProducts(selectedCategory, searchQuery);
  }


  return (
    <main className="Lu-main">
      <section className="head-nav">
        <form onSubmit={handleSearchSubmit}
          className="search-form"
        >
          <Search className="S-search-icon" />
          <input
            type="search"
            placeholder="어떤 물건을 찾으시나요?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </form>
      </section>

      <nav className="categories">
        {categories.map((item) => (
          <button key={item.id} className={`categories-btn ${selectedCategory === item.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(item.id)}>
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </button>
        )
        )}
      </nav>

      <section>
        <p className="item-count">{products.length}개의 물건을 찾았습니다.</p>
        {loading && <p className="loading-text">로딩 중...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && (
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
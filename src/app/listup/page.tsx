'use client'

import Link from "next/link"
import { useState } from "react"
import { Search } from 'lucide-react'

export default function Listup() {

const categories = [
    { id: 'all', name: '전체', icon: '💎' },
    { id: 'tools', name: '공구/도구', icon: '🔧' },
    { id: 'electronics', name: '전자기기', icon: '💻' },
    { id: 'sports', name: '스포츠', icon: '🚴' },
    { id: 'camping', name: '캠핑', icon: '⛺' },
    { id: 'books', name: '도서', icon: '📚' },
    { id: 'etc', name: '기타', icon: '📦' },
    ];

    const mockItems = [
  {
    id: 1,
    title: '전동 드릴 세트',
    description: '가정용 DIY에 최적화되어 있습니다. 배터리 2개 포함, 드릴비트 세트가 함께 제공됩니다.',
    price: '15,000',
    location: '서울시 강남구',
    rating: 4.8,
  },
  {
    id: 2,
    title: '전동 드릴 세트',
    description: '가정용 DIY에 최적화되어 있습니다. 배터리 2개 포함, 드릴비트 세트가 함께 제공됩니다.',
    price: '15,000',
    location: '서울시 강남구',
    rating: 4.8,
  },
  {
    id: 3,
    title: '전동 드릴 세트',
    description: '가정용 DIY에 최적화되어 있습니다. 배터리 2개 포함, 드릴비트 세트가 함께 제공됩니다.',
    price: '15,000',
    location: '서울시 강남구',
    rating: 4.8,
  },

];
    
const [selectedCategory, setSelectedCategory] = useState('전체');

const [searchQuery, setSearchQuery] = useState('') ;

    return(
        <main className="Lu-main">
            <section className="head-nav">
                <form onSubmit={(e) => e.preventDefault()}
                      className="search-form"                  
                  >
                <Search className="S-search-icon"/>
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
                    <button key={item.id} className="categories-btn"
                            onClick={()=> setSelectedCategory(item.name)}>
                                <span>{item.icon}</span>
                                <span>{item.name}</span>
                            </button>
                )
                )}
            </nav>

            <section>
                <p className="item-count">{mockItems.length}개의 물건을 찾았습니다.</p>
        
        <div className="item-grid">
          {mockItems.map((item) => (
            <article key={item.id} className="item-card">
              <div className="card-img-box"><img src="data:image/png;base64,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" alt="" /></div>
              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-desription">{item.description}</p>
                <strong className="card-price">{item.price}원 / <p>일</p></strong>
          
                <div className="card-footer">
                  <span className="card-location">위치: {item.location}</span>
                  <span className="card-rating">별점: {item.rating}</span>
                </div>
              </div>
            </article>
            )
           )
          }
        </div>
            </section>
        </main>
    )
}
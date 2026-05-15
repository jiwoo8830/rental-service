'use client'

import Link from "next/link"
import { useState } from "react"

export default function Listup() {

const categories = [
    { id: 'all', name: '전체', icon: '💎' },
    { id: 'tools', name: '공구/도구', icon: '🔧' },
    { id: 'electronics', name: '전자기기', icon: '💻' },
    { id: 'sports', name: '스포츠', icon: '🚴' },
    { id: 'camping', name: '캠핑', icon: '⛺' },
    { id: 'music', name: '음악/악기', icon: '🎵' },
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
        <main>
            <section>
                <form onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="search" 
                    placeholder="어떤 물건을 찾으시나요?" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">검색</button>
                </form>
            </section>
            
            <nav className="categories">
                {categories.map((item) => (
                    <button key={item.id}
                            onClick={()=> setSelectedCategory(item.name)}>
                                <span>{item.icon}</span>
                                <span>{item.name}</span>
                            </button>
                )
                )}
            </nav>

            <section>
                <p>{mockItems.length}개의 물건을 찾았습니다</p>
        
        <div>
          {mockItems.map((item) => (
            <article key={item.id}>

              <div>이미지 영역</div>
              

              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <strong>{item.price}원 / 일</strong>
                
                <div>
                  <span>위치: {item.location}</span>
                  <span>별점: {item.rating}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
            </section>

        </main>
    )
}
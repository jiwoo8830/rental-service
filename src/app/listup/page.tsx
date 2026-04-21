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
    const [activeTap, setActiveTap] = useState('전체');

    return(
        <div>
            <form className="search-box">
                <input 
                    type="search"
                    name="search"
                    placeholder="어떤 물건을 찾으신가요?" />
            </form>
            
            <nav className="categories">
                {categories.map((item) => (
                    
                )
                )}
            </nav>

        </div>
    )
}
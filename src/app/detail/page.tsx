'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

interface ProductDetail {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    category: string;
}



export default function Detail() {

    const searchParams = useSearchParams();
    const productId = searchParams.get('id');
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!productId) return;

        const fetchProductDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/products/${productId}`);
                if (!response.ok) {
                    throw new Error('상품 정보를 불러오지 못했습니다.');
                }
                const result = await response.json();
                setProduct(result.data); // 임시
            } catch (err: any) {
                setError(err.message || '오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [productId]);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;
    if (!product) return <p>상품을 찾을 수 없습니다.</p>;




    return (
        <main className="detail-container">

            <section className="product-info">
                <h1>{product.title}</h1>
                <p className="description">{product.description}</p>
                <p className="price">{product.price.toLocaleString()}원 / 일</p>
                <p className="location">위치: {product.location}</p>
            </section>

        </main>
    );
}
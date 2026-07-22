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

    //------달력-------//
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const todayString = new Date().toISOString().split('T')[0];
    
    const handleReservation = () => {
            setShowDatePicker(true);  };
    const submitReservation = async () => {
        if (!startDate || !endDate) {
            alert("시작일과 종료일 모두 선택.")
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (start<today) {
            alert("그 날짜는 이미 지난 날짜 입니다.");
            return;
        }
        
        if (end<start) {
            alert("시간여행을 하고 계신건가요?")
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`/api/reservations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId,
                    startDate,
                    endDate,
                }),
            });
            
            if (!response.ok) {
                throw new Error('예약 실패했어요ㅠㅠ');
            }

            const result = await response.json();
            alert('예약 성공!');
            setShowDatePicker(false);
        } catch (err:any) {
            alert(err.message || '요류 발생 ㅡㅅㅡ');
        } finally {
            setLoading(false);
        }
    };
    

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
                <h1 className="product-info-title">{product.title}</h1>
                <p className="description">{product.description}</p>
                <p className="price">{product.price.toLocaleString()}원 / 일</p>
                <p className="location">🗺️위치: {product.location}</p>
            </section>

            <section className="reservation-action">
                {!showDatePicker ? (
                    <button onClick={handleReservation} className="reserve-btn">
                        예약하기
                    </button>
                ) : (
                    <div className="date-picker-box">
                        <h3>예약 날짜 선택</h3>
                        <div className="date-inputs">
                            <label>
                                시작일 : 
                                <input 
                                    type="date"
                                    value={startDate}
                                    min={todayString}
                                    onChange={(e) => setStartDate(e.target.value)} />
                            </label>
                            <label>
                                    종료일 :
                                    <input 
                                        type="date"
                                        value={endDate}
                                        min={startDate || todayString}
                                        onChange={(e) => setEndDate(e.target.value)} />
                            </label>
                        </div>
                        <button onClick={submitReservation} className="confirm-reserve-btn">
                                예약 확정하기
                        </button>
                        <button
                            onClick={submitReservation}
                            className="confirm-reserve-btn"
                            disabled={loading}
                        >
                            취소
                        </button>
                    </div>
                )

                }
            </section>
        </main>
    );
}
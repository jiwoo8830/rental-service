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

    //------ 커스텀 달력 모달 상태 -------//
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [currentViewDate, setCurrentViewDate] = useState(new Date());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const year = currentViewDate.getFullYear();
    const month = currentViewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();

    const handlePrevMonth = () => setCurrentViewDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentViewDate(new Date(year, month + 1, 1));

    const handleDateClick = (dayNum: number) => {
        const formattedMonth = String(month + 1).padStart(2, '0');
        const formattedDay = String(dayNum).padStart(2, '0');
        const dateStr = `${year}-${formattedMonth}-${formattedDay}`;

        const targetDate = new Date(year, month, dayNum);
        if (targetDate < today) return;

        if (selectedDates.includes(dateStr)) {
            setSelectedDates(selectedDates.filter((d) => d !== dateStr));
        } else {
            setSelectedDates([...selectedDates, dateStr].sort());
        }
    };

    const submitReservation = async () => {
        if (selectedDates.length === 0) {
            alert("달력에서 예약할 날짜를 최소 하나 이상 클릭해 주세요.");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`/api/reservations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId,
                    reservationDates: selectedDates,
                }),
            });

            if (!response.ok) {
                throw new Error('예약에 실패했습니다.');
            }

            alert(`총 ${selectedDates.length}일 예약이 완료되었습니다!`);
            setShowDatePicker(false);
            setSelectedDates([]);
        } catch (err: any) {
            alert(err.message || '오류가 발생했습니다.');
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
                setProduct(result.data);
            } catch (err: any) {
                setError(err.message || '오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [productId]);

    if (loading && !product) return <p>로딩 중...</p>;
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
                <button onClick={() => setShowDatePicker(true)} className="reserve-btn">
                    예약하기
                </button>

                {showDatePicker && (
                    <div className="modal-overlay" onClick={() => setShowDatePicker(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h3 className="calendar-title">대여 날짜 선택</h3>

                            {/* 월 이동 헤더 */}
                            <div className="calendar-month-nav">
                                <button type="button" onClick={handlePrevMonth} className="month-nav-btn">&lt;</button>
                                <span className="month-nav-label">{year}년 {month + 1}월</span>
                                <button type="button" onClick={handleNextMonth} className="month-nav-btn">&gt;</button>
                            </div>

                            {/* 요일 표시 */}
                            <div className="calendar-weekdays">
                                {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
                                    <span key={d} className="weekday-item">{d}</span>
                                ))}
                            </div>

                            {/* 날짜 그리드 */}
                            <div className="calendar-days-grid">
                                {Array.from({ length: startDay }).map((_, i) => (
                                    <div key={`empty-${i}`} />
                                ))}

                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                    const dayNum = i + 1;
                                    const formattedMonth = String(month + 1).padStart(2, '0');
                                    const formattedDay = String(dayNum).padStart(2, '0');
                                    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;

                                    const targetDate = new Date(year, month, dayNum);
                                    const isPast = targetDate < today;
                                    const isSelected = selectedDates.includes(dateStr);

                                    return (
                                        <button
                                            key={dayNum}
                                            type="button"
                                            disabled={isPast}
                                            onClick={() => handleDateClick(dayNum)}
                                            className={`day-btn ${isSelected ? 'selected' : ''} ${isPast ? 'past' : ''}`}
                                        >
                                            {dayNum}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* 선택된 날짜 요약 */}
                            <p className="calendar-summary">
                                선택된 날짜: <strong>{selectedDates.length}일</strong>
                            </p>

                            {/* 모달 하단 버튼 */}
                            <div className="modal-buttons">
                                <button
                                    onClick={submitReservation}
                                    className="confirm-reserve-btn"
                                    disabled={loading || selectedDates.length === 0}
                                >
                                    {loading ? '처리 중...' : `${selectedDates.length}일 예약하기`}
                                </button>
                                <button
                                    onClick={() => {
                                        setShowDatePicker(false);
                                        setSelectedDates([]);
                                    }}
                                    className="cancel-reserve-btn"
                                >
                                    취소
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}
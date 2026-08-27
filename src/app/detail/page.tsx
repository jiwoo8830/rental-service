'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { DayPicker, DateRange } from 'react-day-picker'
import { ko } from 'date-fns/locale'
import { format, differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import 'react-day-picker/style.css'
import { useRouter } from 'next/navigation'

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
    const router = useRouter();

    //------ react-day-picker 달력 모달 상태 -------//
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateRange, setDateRange] = useState<DateRange | undefined>();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 대여 일수 계산
    const totalDays = dateRange?.from
        ? differenceInCalendarDays(dateRange.to || dateRange.from, dateRange.from) + 1
        : 0;

    const submitReservation = async () => {
        if (!dateRange?.from) {
            alert("달력에서 예약할 날짜를 선택해 주세요.");
            return;
        }

        // 선택한 기간의 모든 날짜를 YYYY-MM-DD 배열로 변환
        const endDate = dateRange.to || dateRange.from;
        const intervalDates = eachDayOfInterval({ start: dateRange.from, end: endDate });
        const selectedDates = intervalDates.map((d) => format(d, 'yyyy-MM-dd'));

        try {
            setLoading(true);
            const response = await fetch(`/api/reservations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId,
                    reservationDates: selectedDates,
                    totalPrice: product?.price ? product.price * totalDays : 0,
                }),
            });

            if (!response.ok) {
                throw new Error('예약 요청에 실패했습니다.');
            }

            const result = await response.json();
            const reservationId = result.data?.id || result.id;
            const totalPrice = product?.price ? product.price * totalDays : 0;

            setShowDatePicker(false);
            setDateRange(undefined);

            // 결제 페이지로 이동 (reservationId 및 대여 정보 쿼리파라미터 전달)
            if (reservationId) {
                router.push(
                    `/payment?reservationId=${reservationId}&title=${encodeURIComponent(product?.title || '')}&amount=${totalPrice}`
                );
            } else {
                router.push(`/payment?productId=${productId}&from=${format(dateRange.from, 'yyyy-MM-dd')}&to=${format(endDate, 'yyyy-MM-dd')}`);
            }
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
            <div className="detail-wrapper">
                <div className="detail-img-box">
                    {product.images && product.images.length > 0 && product.images[0] !== "string" ? (
                        <img
                            src={product.images[0]}
                            alt={product.title}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = "https://via.placeholder.com/400x350?text=No+Image";
                            }}
                        />
                    ) : (
                        <span>이미지가 없습니다.</span>
                    )}
                </div>

                <div className="detail-content-box">
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
                                    <h3 className="calendar-title">대여 기간 선택</h3>

                                    {/* react-day-picker 라이브러리 적용 */}
                                    <div className="day-picker-container" style={{ display: 'flex', justifyContent: 'center', margin: '15px 0' }}>
                                        <DayPicker
                                            mode="range"
                                            selected={dateRange}
                                            onSelect={setDateRange}
                                            locale={ko}
                                            disabled={{ before: today }}
                                        />
                                    </div>

                                    {/* 선택된 기간 및 금액 요약 */}
                                    <div className="calendar-summary" style={{ textAlign: 'center', marginBottom: '15px' }}>
                                        {dateRange?.from ? (
                                            <p>
                                                선택 기간: <strong>{format(dateRange.from, 'yyyy.MM.dd')}</strong>
                                                {dateRange.to && ` ~ ${format(dateRange.to, 'yyyy.MM.dd')}`}
                                                <br />
                                                총 <strong>{totalDays}일</strong> / 예상 금액: <strong>{(product.price * totalDays).toLocaleString()}원</strong>
                                            </p>
                                        ) : (
                                            <p>대여 시작일과 종료일을 선택해 주세요.</p>
                                        )}
                                    </div>

                                    {/* 모달 하단 버튼 */}
                                    <div className="modal-buttons">
                                        <button
                                            onClick={submitReservation}
                                            className="confirm-reserve-btn"
                                            disabled={loading || !dateRange?.from}
                                        >
                                            {loading ? '처리 중...' : totalDays > 0 ? `${totalDays}일 예약하기` : '예약하기'}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowDatePicker(false);
                                                setDateRange(undefined);
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
                </div>
            </div>
        </main>
    );
}

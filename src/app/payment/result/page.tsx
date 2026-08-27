'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function PaymentResultPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const status = searchParams.get('status');
    const reservationId = searchParams.get('reservationId');
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');

    const errorCode = searchParams.get('code');
    const errorMessage = searchParams.get('messeage');

    const [isLoading, setIsLoading] = useState(status === 'success')
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (status !== 'success' || !paymentKey || !orderId || !amount) {
            setIsSuccess(false);
            setErrorMsg(errorMessage || '결제 취~소');
            setIsLoading(false);
            return;
        }

        (async ()=> {
            try {
                const response = await fetch('/api/payment/confirm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentKey, orderId, amount, reservationId }),
            });
            
            if (!response.ok) throw new Error('결제 승인 검증 실패');

            setIsSuccess(true);
            } catch (err: any) {
                setIsSuccess(false);
                setErrorMsg(err.message || '결제 승인 처리 중 오류');
            } finally {
                setIsLoading(false);
            }
        })();
    }, [status, paymentKey, orderId, amount, errorMessage]);
    
    return(
        <div>
            {isSuccess ? (
                <div className="result-box success">
                    <h2>🎉 결제 요청 완료!</h2>
                    <p>작성자에게 예약 요청이 전달되었습니다.</p>
                    <div className="info-summary">
                        <p><strong>주문 번호:</strong> {orderId}</p>
                        <p><strong>결제 금액:</strong> {Number(amount).toLocaleString()}원</p>
                    </div>
                    <p className="notice">
                        ※ 작성자가 예약을 수락하면 결제가 최종 확정(대여 예정)됩니다.
                    </p>
                    <button className="btn-primary" onClick={() => router.push('/reservations')}>
                        예약 내역 확인하기
                    </button>
                </div>
            ) : (
                <div className="result-box fail">
                    <h2>❌ 결제 실패</h2>
                    <p className="error-text">{errorMsg}</p>
                    {errorCode && <p className="error-code">코드: {errorCode}</p>}
                    <button className="btn-secondary" onClick={() => router.back()}>
                        다시 결제하기
                    </button>
                </div>
            )}
        </div>
    );
}


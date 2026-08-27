'use client';

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // 1. useSearchParams-주소의 ?부분 뒤의 정보를 가져올수있게
import {
    loadTossPayments,
    ANONYMOUS,
    TossPaymentsWidgets,
} from '@tosspayments/tosspayments-sdk';

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;
const customerKey = ANONYMOUS;

export default function CheckoutPage() {
    const searchParams = useSearchParams();

    // 2. detail 페이지에서 넘겨준 URL 쿼리 파라미터 읽기
    const reservationId = searchParams.get('reservationId');
    const orderNameParam = searchParams.get('title') || '대여 서비스 결제';
    const amountParam = Number(searchParams.get('amount')) || 0; // 예: 50000

    // 3. 동적으로 동의받은 결제 금액 설정
    const [amount, setAmount] = useState({ currency: 'KRW', value: amountParam });
    const widgetsRef = useRef<TossPaymentsWidgets | null>(null);
    const [ready, setReady] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!amount.value) {
            alert("결제 정보가 올 바 르 지 않 다 고 !");
            router.push('/detail')
            return;
        }

        (async () => {
            const tossPayments = await loadTossPayments(clientKey);
            const widgets = tossPayments.widgets({ customerKey });
            widgetsRef.current = widgets;

            // 금액 업데이트
            await widgets.setAmount(amount);

            // 결제 수단 및 약관 영역 렌더링
            await Promise.all([
                widgets.renderPaymentMethods({
                    selector: '#payment-method',
                    variantKey: 'DEFAULT',
                }),
                widgets.renderAgreement({
                    selector: '#agreement',
                    variantKey: 'AGREEMENT',
                }),
            ]);

            setReady(true);
        })();
    }, [amount]);

    const handlePayment = async () => {
        const widgets = widgetsRef.current;
        if (!widgets) return;
        await widgets.requestPayment({
            orderId: reservationId ? `RES_${reservationId}_${Date.now().toString().slice(-6)}` : crypto.randomUUID().replace(/-/g, '').slice(0, 20),
            orderName: orderNameParam,
            successUrl: `${window.location.origin}/payment/result?status=success&reservationId=${reservationId}`,
            failUrl: `${window.location.origin}/payment/result?status=fail&reservationId=${reservationId}`,
            customerEmail: 'customer@example.com',
            customerName: '홍길동',
        });
    };

    return (
        <div className="payment-container">
            <h2>대여 결제하기</h2>
            <div className="payment-summary">
                <p><strong>주문 상품:</strong> {orderNameParam}</p>
                <p><strong>결제 금액:</strong> {amount.value.toLocaleString()}원</p>
            </div>

            {/* 토스 위젯 영역 */}
            <div id="payment-method" />
            <div id="agreement" />

            <button className="pay-button" disabled={!ready} onClick={handlePayment}>
                {amount.value.toLocaleString()}원 결제하기
            </button>
        </div>
    );
}


import { NextResponse, NextRequest } from "next/server";
import {mockReservations, MockReservation} from '@/lib/mockReservations';

export async function Post(req: NextRequest) {
    try {
        const body = await req.json();
        const { productId, reservationDates, totalPrice, itemTitle, itemImage} = body;

        const newReservation: MockReservation = {
            id: `RES-${Date.now().toString().slice(-6)}`,
            productId: String(productId),
            itemTitle: itemTitle || `대여 상품 #${productId}`,
            itemImage: itemImage || 'https://via.placeholder.com/150?text=Item',
            startDate: reservationDates[0] || '2026-10-10',
            endDate: reservationDates[reservationDates.length - 1] || '2026-10-11',
            totalPrice: Number(totalPrice) || 50000,
            status: 'PENDING', // 1단계: 승인 대기 / 가결제 전
            guestEmail: 'me@example.com',
            guestName: '나(신청자)',
            hostEmail: 'host@example.com',
            hostName: '호스트',
            createdAt: new Date().toISOString(),
        };

        mockReservations.unshift(newReservation);

        return NextResponse.json({
            success:true,
            data: {id: newReservation.id},
            message: "예약 요청이 생성되었습니다.",
        });
    } catch (error) {
        return NextResponse.json({ message: "예약 생성 실패"}, {status: 500});
    }
}

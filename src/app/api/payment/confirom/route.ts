
import { NextRequest, NextResponse } from "next/server";
import { mockReservations } from "@/lib/mockReservations";

export async function POST(req: NextRequest) {
    try {
        const { paymentKey, orderId, amount, reservationId} = await reqjson();

        const target = mockReservations.find(r => r.id === reservationId);
        if(target) {
            target.paymentKey = paymentKey;
            target.orderId = orderId;
            target.status = 'PENDING'
        }

        return NextResponse.json({
            success: true,
            message: "가결제 (승인 보류) 완료.",
            data: { reservationId, orderId, amount}
        });
    } catch (error) {
        return NextResponse.json({message: "실패"}, { status: 500});
    }
}
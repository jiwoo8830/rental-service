
import { NextRequest, NextResponse } from "next/server";
import { mockReservations } from "@/lib/mockReservations";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');

    if (type === 'sent') {
        const sent = mockReservations.filter(r => r.guestEmail === 'me@example.com');
        return NextResponse.json({ data: sent });
    } else {
        const received = mockReservations.filter(r => r.hostEmail === 'me@example.com');
        return NextResponse.json({ data: received });
    }
}

export async function PATCH(req: NextRequest) {
    const { id, action } = await req.json();
    const target = mockReservations.find(r => r.id === id);
    if(!target) {
        return NextResponse.json({ message: "예약자를 찾을 수 없다."}, {status: 404});
    }

    if (action === 'APPROVE') {
        target.status = 'APPROVED';
    } else if (action === 'REJECT') {
        target.status = 'REJECTED';
    }

    return NextResponse.json({ success: true, data: target });
}
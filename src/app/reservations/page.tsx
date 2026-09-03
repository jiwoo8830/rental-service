'use client';

import { useState } from "react";


interface Reservation {
    id: string;
    itemTitle: string;
    itemImage: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'RENTING' | 'COMPLETED';
    userName: string; // 신청자 또는 작성자 이름
    userRating: number;
}

export default function ReservationsPage() {

    return (
        <div>

        </div>
    )
}
'use client';

import { useState } from "react";

//예시 데이터
interface Reservation {
    id: string;
    itemTitle: string;
    itemImage: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'RENTING' | 'COMPLETED';
    userName: string;
    userRating: number;
}

export default function ReservationsPage() {

    const [activeTab, setActiveTab] = useState<'sent' | 'reseived'>('sent');

    const mockSentReservations: Reservation[] = [
    {
      id: 'res-1',
      itemTitle: '소니 A7M4 카메라 바디 + 렌즈 세트',
      itemImage: 'https://via.placeholder.com/100',
      startDate: '2026-09-05',
      endDate: '2026-09-07',
      totalPrice: 90000,
      status: 'PENDING',
      userName: '카메라왕 (작성자)',
      userRating: 4.8,
    },
  ];

    const mockReceivedReservations: Reservation[] = [
    {
      id: 'res-2',
      itemTitle: '캠핑용 텐트 & 테이블 풀세트',
      itemImage: 'https://via.placeholder.com/100',
      startDate: '2026-09-10',
      endDate: '2026-09-12',
      totalPrice: 120000,
      status: 'PENDING',
      userName: '캠핑조아 (신청자)',
      userRating: 4.9,
    },
  ];

     const handleApprove = (id: string) => {
    alert(`예약 [${id}]을(를) 수락했습니다. (결제 승인 API 연동 필요)`);
  };

  const handleReject = (id: string) => {
    alert(`예약 [${id}]을(를) 거절했습니다. (가결제 취소 API 연동 필요)`);
  };
    return (
        <div>
            
        </div>
    )
}
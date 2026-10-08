'use client';

import { useState } from "react";

// 예약 데이터 타입 정의
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
    const [activeTab, setActiveTab] = useState<'sent' | 'received'>('sent');

    const [sentReservations, setSentReservations] = useState<Reservation[]>([
        {
            id: 'res-1',
            itemTitle: '소니 A7M4 카메라 바디 + 렌즈 세트',
            itemImage: 'https://via.placeholder.com/150?text=Camera',
            startDate: '2026-09-05',
            endDate: '2026-09-07',
            totalPrice: 90000,
            status: 'PENDING',
            userName: '카메라왕 (작성자)',
            userRating: 4.8,
        },
    ]);

    const [receivedReservations, setReceivedReservations] = useState<Reservation[]>([
        {
            id: 'res-2',
            itemTitle: '캠핑용 텐트 & 테이블 풀세트',
            itemImage: 'https://via.placeholder.com/150?text=Tent',
            startDate: '2026-09-10',
            endDate: '2026-09-12',
            totalPrice: 120000,
            status: 'PENDING',
            userName: '캠핑조아 (신청자)',
            userRating: 4.9,
        },
    ]);

    // 예약 수락 (호스트)
    const handleApprove = (id: string) => {
        if (!confirm('해당 대여 요청을 수락하시겠습니까? (결제가 최종 승인되고 대여 예정 상태로 변경됩니다.)')) {
            return;
        }
        setReceivedReservations(prev =>
            prev.map(item => item.id === id ? { ...item, status: 'APPROVED' } : item)
        );
        alert(`예약 [${id}]을(를) 수락했습니다. (결제 승인 처리 완료)`);
    };

    // 예약 거절 (호스트)
    const handleReject = (id: string) => {
        if (!confirm('해당 대여 요청을 거절하시겠습니까? (가결제가 취소되고 예약이 취소됩니다.)')) {
            return;
        }
        setReceivedReservations(prev =>
            prev.map(item => item.id === id ? { ...item, status: 'REJECTED' } : item)
        );
        alert(`예약 [${id}]을(를) 거절했습니다. (가결제 취소 처리 완료)`);
    };

    // 예약 취소 (게스트/신청자)
    const handleCancelRequest = (id: string) => {
        if (!confirm('대여 신청을 취소하시겠습니까? (가결제 승인 대기가 취소됩니다.)')) {
            return;
        }
        setSentReservations(prev =>
            prev.map(item => item.id === id ? { ...item, status: 'REJECTED' } : item)
        );
        alert(`예약 [${id}] 신청이 취소되었습니다.`);
    };

    const getStatusBadge = (status: Reservation['status']) => {
        switch (status) {
            case 'PENDING':
                return <span className="reservation-badge reservation-badge-pending">승인 대기중</span>;
            case 'APPROVED':
                return <span className="reservation-badge reservation-badge-approved">예약 승인 (대여 예정)</span>;
            case 'REJECTED':
                return <span className="reservation-badge reservation-badge-rejected">거절/취소됨</span>;
            case 'RENTING':
                return <span className="reservation-badge reservation-badge-renting">대여중</span>;
            case 'COMPLETED':
                return <span className="reservation-badge reservation-badge-completed">거래 완료</span>;
            default:
                return <span className="reservation-badge">{status}</span>;
        }
    };

    return (
        <div className="reservations-container">
            <h1 className="reservations-title">예약 관리</h1>

            {/* 탭 네비게이션 */}
            <div className="reservations-tabs">
                <button
                    className={`reservations-tab-btn ${activeTab === 'sent' ? 'active' : ''}`}
                    onClick={() => setActiveTab('sent')}
                >
                    내가 신청한 대여 ({sentReservations.length})
                </button>
                <button
                    className={`reservations-tab-btn ${activeTab === 'received' ? 'active' : ''}`}
                    onClick={() => setActiveTab('received')}
                >
                    내가 받은 예약 요청 ({receivedReservations.length})
                </button>
            </div>

            {/* 탭 콘텐츠 영역 */}
            <div className="reservations-tab-content">
                {activeTab === 'sent' ? (
                    /* 내가 신청한 대여 목록 */
                    <div className="reservations-card-list">
                        {sentReservations.length === 0 ? (
                            <div className="reservations-empty">신청한 대여 내역이 없습니다.</div>
                        ) : (
                            sentReservations.map((item) => (
                                <div key={item.id} className="reservation-card">
                                    <div className="reservation-card-main">
                                        <img
                                            src={item.itemImage}
                                            alt={item.itemTitle}
                                            className="reservation-thumb"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.onerror = null;
                                                target.src = "https://via.placeholder.com/150?text=No+Image";
                                            }}
                                        />
                                        <div className="reservation-card-info">
                                            <h3 className="reservation-item-title">{item.itemTitle}</h3>
                                            <p className="reservation-date">대여 기간: {item.startDate} ~ {item.endDate}</p>
                                            <p className="reservation-price">결제 금액: <strong>{item.totalPrice.toLocaleString()}원</strong></p>
                                            <p className="reservation-user-info">호스트: {item.userName} (★ {item.userRating})</p>
                                        </div>
                                    </div>
                                    <div className="reservation-card-side">
                                        {getStatusBadge(item.status)}
                                        {item.status === 'PENDING' && (
                                            <button
                                                className="reservation-reject-btn"
                                                onClick={() => handleCancelRequest(item.id)}
                                            >
                                                신청 취소
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    /* 내가 받은 예약 요청 목록 */
                    <div className="reservations-card-list">
                        {receivedReservations.length === 0 ? (
                            <div className="reservations-empty">받은 예약 요청이 없습니다.</div>
                        ) : (
                            receivedReservations.map((item) => (
                                <div key={item.id} className="reservation-card">
                                    <div className="reservation-card-main">
                                        <img
                                            src={item.itemImage}
                                            alt={item.itemTitle}
                                            className="reservation-thumb"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.onerror = null;
                                                target.src = "https://via.placeholder.com/150?text=No+Image";
                                            }}
                                        />
                                        <div className="reservation-card-info">
                                            <h3 className="reservation-item-title">{item.itemTitle}</h3>
                                            <p className="reservation-date">대여 희망 기간: {item.startDate} ~ {item.endDate}</p>
                                            <p className="reservation-price">결제 예정 금액: <strong>{item.totalPrice.toLocaleString()}원</strong></p>
                                            <p className="reservation-user-info">신청자: {item.userName} (★ {item.userRating})</p>
                                        </div>
                                    </div>

                                    <div className="reservation-card-side">
                                        {getStatusBadge(item.status)}
                                        {item.status === 'PENDING' && (
                                            <div className="reservation-action-buttons">
                                                <button
                                                    className="reservation-approve-btn"
                                                    onClick={() => handleApprove(item.id)}
                                                >
                                                    예약 수락
                                                </button>
                                                <button
                                                    className="reservation-reject-btn"
                                                    onClick={() => handleReject(item.id)}
                                                >
                                                    거절
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
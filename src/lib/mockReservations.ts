// src/lib/mockReservations.ts

export interface MockReservation {
  id: string;
  productId: string;
  itemTitle: string;
  itemImage: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'RENTING' | 'COMPLETED';
  guestEmail: string;
  guestName: string;
  hostEmail: string;
  hostName: string;
  userRating?: number;
  paymentKey?: string;
  orderId?: string;
  createdAt: string;
}

// Next.js 개발 모드(HMR)에서 소스 수정 시에도 메모리 내 데이터가 초기화되지 않도록 globalThis에 보관
const globalForReservations = globalThis as unknown as {
  mockReservations: MockReservation[];
};

export const mockReservations: MockReservation[] =
  globalForReservations.mockReservations || [
    {
      id: 'res-101',
      productId: '1',
      itemTitle: '소니 A7M4 카메라 바디 + 렌즈 세트',
      itemImage: 'https://via.placeholder.com/150?text=Camera',
      startDate: '2026-09-05',
      endDate: '2026-09-07',
      totalPrice: 90000,
      status: 'PENDING',
      guestEmail: 'me@example.com',
      guestName: '나(게스트)',
      hostEmail: 'host1@example.com',
      hostName: '카메라왕 (호스트)',
      userRating: 4.8,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'res-102',
      productId: '2',
      itemTitle: '캠핑용 텐트 & 테이블 풀세트',
      itemImage: 'https://via.placeholder.com/150?text=Tent',
      startDate: '2026-09-10',
      endDate: '2026-09-12',
      totalPrice: 120000,
      status: 'PENDING',
      guestEmail: 'camper@example.com',
      guestName: '캠핑조아 (신청자)',
      hostEmail: 'me@example.com',
      hostName: '나(호스트)',
      userRating: 4.9,
      createdAt: new Date().toISOString(),
    },
  ];

if (process.env.NODE_ENV !== 'production') {
  globalForReservations.mockReservations = mockReservations;
}

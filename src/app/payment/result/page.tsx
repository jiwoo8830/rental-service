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


}

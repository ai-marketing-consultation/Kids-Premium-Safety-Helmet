'use client';
import { useRouter } from 'next/navigation'; import { product } from '@/lib/product';
export function OrderLink({ children, quantity = 1, className = 'btn-primary' }: { children: React.ReactNode; quantity?: number; className?: string }) { const router = useRouter(); return <button className={className} onClick={() => router.push(`/checkout?quantity=${quantity}&price=${product.offerPrice}`)}>{children}</button>; }

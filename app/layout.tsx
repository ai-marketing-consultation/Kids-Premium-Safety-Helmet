import type { Metadata } from 'next'; import './globals.css'; import { ReelEnhancer } from '@/components/ReelEnhancer';
export const metadata: Metadata = { title: 'Kids Premium Safety Helmet', description: 'Premium protection for little adventures.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}<ReelEnhancer /><a href="/checkout" className="quick-order">ORDER NOW</a></body></html>; }

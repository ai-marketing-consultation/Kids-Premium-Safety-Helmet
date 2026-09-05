import type { Metadata } from 'next'; import './globals.css';
export const metadata: Metadata = { title: 'Kids Premium Safety Helmet', description: 'Premium protection for little adventures.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}<a href="/checkout" className="quick-order">ORDER NOW</a></body></html>; }

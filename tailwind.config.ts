import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { ink: '#151719', lime: '#D9FF3F', coral: '#FF6B4A' }, boxShadow: { glow: '0 20px 55px rgba(217,255,63,.18)' } } }, plugins: [] };
export default config;

import { useId } from "react";

export function CreationBrandMark({ className }: { className?: string }) {
    const id = useId().replace(/:/g, "");
    return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
            <defs>
                <linearGradient id={`${id}-blue`} x1="5" y1="4" x2="42" y2="42" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#73DFFF" />
                    <stop offset=".5" stopColor="#4168FF" />
                    <stop offset="1" stopColor="#B24DF4" />
                </linearGradient>
                <linearGradient id={`${id}-pink`} x1="5" y1="41" x2="37" y2="10" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#DC54E8" />
                    <stop offset=".5" stopColor="#8582FF" />
                    <stop offset="1" stopColor="#59D7F5" />
                </linearGradient>
            </defs>
            <path d="M24 3C35.6 3 45 12.4 45 24c0 9.4-6.2 17.3-14.8 20.1 5.3-4.7 7.3-11.9 5.2-18.1C32 15.9 18.7 10.8 9 15.1 12.4 7.9 17.9 3 24 3Z" fill={`url(#${id}-blue)`} />
            <path d="M4.7 16.2C9 6 22.6 5.2 31.2 12.1c-8.4-1.7-15.5 3.2-17.1 10.5-1.6 7.2 2.8 14.1 10.4 16.9-9.1 2.8-17.8-1.1-20.5-8.5-1.8-4.8-1.6-10 .7-14.8Z" fill={`url(#${id}-pink)`} />
            <path d="M15.2 42.9C6.8 39.4 2.5 31.3 4.2 23.9c2.8 8.7 11.2 13.2 19.4 11.5 9-1.8 14.6-10.1 12.8-18.9 6.6 6 7.2 15.7 2 22-5.5 6.6-15.2 8-23.2 4.4Z" fill={`url(#${id}-blue)`} opacity=".85" />
        </svg>
    );
}

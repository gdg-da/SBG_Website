import { LucideProps } from "lucide-react";

export function ChessIcon(props: LucideProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            {/* Elegant knight piece design */}
            <path d="M8 4h8v2H8z" />
            <path d="M10 6v2h4V6" />
            <path d="M12 8v2" />
            <path d="M10 10h4" />
            <path d="M8 12h8" />
            <path d="M6 14h12" />
            <path d="M4 16h16" />
            <path d="M6 18h12" />
            <path d="M8 20h8" />
            {/* Knight's head and mane */}
            <path d="M10 4c2 0 4-1 4-2" />
            <path d="M14 4c-2 0-4-1-4-2" />
            <path d="M12 2v2" />
            {/* Knight's face */}
            <path d="M11 6h2" />
            <path d="M10 8h4" />
        </svg>
    );
}

export function DanceIcon(props: LucideProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            {/* Dynamic dance pose */}
            <circle cx="12" cy="6" r="2" />
            <path d="M12 8v3" />
            <path d="M8 11c2 1 4 1 8 0" />
            <path d="M8 14c2-1 4-1 8 0" />
            <path d="M7 17c2-1 4-1 5 0" />
            <path d="M12 17c2-1 4-1 5 0" />
            {/* Arms */}
            <path d="M8 11c-1-2 0-4 2-4" />
            <path d="M16 11c1-2 0-4-2-4" />
            {/* Skirt */}
            <path d="M8 14c-2 2-2 4 0 6" />
            <path d="M16 14c2 2 2 4 0 6" />
        </svg>
    );
}

export function RubikCubeIcon(props: LucideProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            {/* 3D Rubik's cube design */}
            {/* Front face */}
            <path d="M8 8h8v8H8z" />
            <path d="M8 8v8" />
            <path d="M16 8v8" />
            <path d="M8 12h8" />
            <path d="M8 16h8" />
            {/* Top face */}
            <path d="M8 8l4-4h8l-4 4" />
            <path d="M12 4l4 4" />
            <path d="M16 4l-4 4" />
            {/* Right face */}
            <path d="M16 8l4 4v8l-4-4" />
            <path d="M20 12l-4 4" />
            <path d="M20 16l-4 4" />
            {/* Cube edges */}
            <path d="M8 8l4-4" />
            <path d="M16 8l4 4" />
            <path d="M16 16l4 4" />
            <path d="M8 16l4 4" />
        </svg>
    );
}

export function CodeBracketIcon(props: LucideProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            {/* Open brackets design */}
            <path d="M6 4l-4 8 4 8" />
            <path d="M18 4l4 8-4 8" />
        </svg>
    );
}

export function InfinityIcon(props: LucideProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            {/* Infinity symbol design */}
            <path d="M12 8c-2.5 0-4.5 2-4.5 4.5S9.5 17 12 17s4.5-2 4.5-4.5S14.5 8 12 8z" />
            <path d="M12 8c2.5 0 4.5-2 4.5-4.5S14.5-1 12-1 7.5 1 7.5 3.5 9.5 8 12 8z" />
            <path d="M12 17c-2.5 0-4.5 2-4.5 4.5S9.5 26 12 26s4.5-2 4.5-4.5S14.5 17 12 17z" />
        </svg>
    );
}

export function DADCDanceIcon(props: LucideProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            {/* Head */}
            <circle cx="20" cy="8" r="3" fill="currentColor" />
            {/* Body */}
            <path d="M20 11v6" stroke="currentColor" strokeWidth="2.5" />
            {/* Arms */}
            <path d="M13 13c3 0 5 2 7 2" stroke="currentColor" strokeWidth="2.5" />
            <path d="M27 13c-3 0-5 2-7 2" stroke="currentColor" strokeWidth="2.5" />
            {/* Legs */}
            <path d="M20 17c-2 2-3 5-3 8" stroke="currentColor" strokeWidth="2.5" />
            <path d="M20 17c2 2 3 5 3 8" stroke="currentColor" strokeWidth="2.5" />
            {/* Musical notes */}
            <circle cx="8" cy="8" r="2.2" fill="currentColor" />
            <circle cx="11" cy="13" r="1.3" fill="currentColor" />
            <path d="M8 8v-3l3 5v3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
} 
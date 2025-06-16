import { cn } from "@/lib/utils"

interface FuturisticDividerProps {
    className?: string
}

export function FuturisticDivider({ className }: FuturisticDividerProps) {
    return (
        <div className={cn("relative flex items-center py-2", className)}>
            <div className="flex-grow border-t border-theme-gray-light"></div>
            <div className="mx-4 flex h-4 items-center">
                <div className="h-1 w-1 rounded-full bg-theme-red"></div>
                <div className="mx-1 h-2 w-2 rounded-full bg-theme-yellow"></div>
                <div className="h-1 w-1 rounded-full bg-theme-red"></div>
            </div>
            <div className="flex-grow border-t border-theme-gray-light"></div>
        </div>
    )
}
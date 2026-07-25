import React from "react"

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse bg-gray-700/30 rounded-lg ${className}`}
      {...props}
    />
  )
}

export function BlogCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl border-4 border-[#F2F2F2]/20 bg-transparent w-full">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/3 bg-gray-600/30" />
      
      <div className="space-y-2 mt-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      
      <div className="flex gap-2 mt-4">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
    </div>
  )
}

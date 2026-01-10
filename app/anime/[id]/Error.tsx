'use client'

export default function Error({ reset }: { reset: () => void }) {
   return (
      <div className="p-6">
         <p className="text-destructive mb-4">Failed to load anime detail.</p>
         <button onClick={reset}>Try again</button>
      </div>
   )
}

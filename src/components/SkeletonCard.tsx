export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-5 border-2 border-gray-200 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="h-5 w-20 bg-gray-100 rounded-md border border-gray-200" />
        <div className="h-4 w-12 bg-gray-100 rounded-md" />
      </div>
      <div className="flex items-center justify-between my-4 gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-3.5 w-28 bg-gray-100 rounded" />
          <div className="h-10 w-14 bg-gray-100 rounded-lg border border-gray-200" />
        </div>
        <div className="h-4 w-5 bg-gray-100 rounded" />
        <div className="flex-1 space-y-2 flex flex-col items-end">
          <div className="h-3.5 w-28 bg-gray-100 rounded" />
          <div className="h-10 w-14 bg-gray-100 rounded-lg border border-gray-200" />
        </div>
      </div>
      <div className="pt-3 mt-2 border-t-2 border-gray-100">
        <div className="h-3.5 w-24 bg-gray-100 rounded" />
      </div>
    </div>
  )
}
import { MatchStatus } from "@/lib/api"

interface Props {
  status: MatchStatus
}

export default function StatusBadge({ status }: Props) {
  if (status === 'live') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wide">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        Live
      </span>
    )
  }

  if (status === 'scheduled') {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md border-2 border-blue-300
                       bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide">
        Scheduled
      </span>
    )
  }

  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md border-2 border-gray-300
                     bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wide">
      Finished
    </span>
  )
}
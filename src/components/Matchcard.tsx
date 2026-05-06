import { Match } from '@/lib/api'

interface Props {
  match: Match
  isSelected: boolean
  onWatchLive: (matchId: number) => void
  onClose: () => void
}

const statusTone: Record<Match['status'], string> = {
  live: 'text-red-600',
  scheduled: 'text-gray-500',
  finished: 'text-gray-500',
}

const statusDot: Record<Match['status'], string> = {
  live: 'bg-red-500',
  scheduled: 'bg-gray-400',
  finished: 'bg-gray-400',
}

const statusLabel: Record<Match['status'], string> = {
  live: 'Live',
  scheduled: 'Scheduled',
  finished: 'Finished',
}

export default function MatchCard({ match, isSelected, onWatchLive, onClose }: Props) {
  const selectCard = () => {
    if (!isSelected) {
      onWatchLive(match.id)
    }
  }

  function handleCardKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      selectCard()
    }
  }

  const startTime = new Date(match.startTime)
  const formattedTime = Number.isNaN(startTime.getTime())
    ? 'TBD'
    : startTime.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    })

  const cardClass = isSelected
    ? 'bg-[#FFFCE8] border-[#F5D000] shadow-lg'
    : 'bg-white border-[#1a1a1a] hover:border-[#F5D000] hover:shadow-md hover:-translate-y-1'

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={selectCard}
      onKeyDown={handleCardKeyDown}
      aria-pressed={isSelected}
      className={`rounded-2xl p-5 border-2 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${cardClass}`}
    >
      {/* Top row */}
      <div className="flex justify-between items-center mb-5 gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-widest bg-transparent
             border-2 border-[#1a1a1a] text-gray-700 px-3 py-1.5 rounded-md leading-none">
          {match.sport}
        </span>
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide ${statusTone[match.status]}`}>
          <span className={`w-2 h-2 rounded-full ${statusDot[match.status]} ${match.status === 'live' ? 'animate-pulse' : ''}`} />
          {statusLabel[match.status]}
        </span>
      </div>

      {/* Score row */}
      <div className="flex items-center justify-between gap-5 my-6">
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-bold text-gray-800 truncate mb-3">
            {match.homeTeam}
          </p>
          <div
            className="inline-block min-w-16 text-center px-4 py-2
                       bg-[#F5D000] border-2 border-[#1a1a1a] rounded-xl shadow-sm"
            style={{ fontFamily: "'Barlow Condensed', 'Arial Black', sans-serif", fontSize: '40px', fontWeight: 800, lineHeight: 1 }}
          >
            {match.homeScore}
          </div>
        </div>

        <div className="text-[16px] font-black text-gray-300 shrink-0 px-4">VS</div>

        <div className="flex-1 min-w-0 text-right">
          <p className="text-[15px] font-bold text-gray-800 truncate mb-3">
            {match.awayTeam}
          </p>
          <div
            className="inline-block min-w-16 text-center px-4 py-2
                       bg-[#F5D000] border-2 border-[#1a1a1a] rounded-xl shadow-sm"
            style={{ fontFamily: "'Barlow Condensed', 'Arial Black', sans-serif", fontSize: '40px', fontWeight: 800, lineHeight: 1 }}
          >
            {match.awayScore}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t-[1.5px] border-[#f0ede4] gap-2">
        <p className="text-[11px] text-gray-500 font-medium leading-none">{formattedTime}</p>

        {isSelected ? (
          <div className="flex items-center gap-3">
            <span
              className="px-4 py-2 text-[13px] font-bold uppercase tracking-wide
                         rounded-lg border-2 border-[#87CEEB] bg-white text-[#87CEEB] leading-none"
            >
              Watching Live
            </span>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onClose()
              }}
              className="px-4 py-2 text-[13px] font-semibold uppercase tracking-wide
                         rounded-lg border-2 border-[#87CEEB] bg-white text-[#87CEEB]
                         hover:bg-[#e0f4ff] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              selectCard()
            }}
            className="px-5 py-2 text-[13px] font-bold uppercase tracking-wide
                       rounded-lg border-2 border-[#1a1a1a] bg-[#F5D000] text-[#1a1a1a] leading-none hover:bg-[#e6c400] hover:shadow-md transition-all duration-200"
          >
            Watch Live
          </button>
        )}
      </div>
    </article>
  )
}
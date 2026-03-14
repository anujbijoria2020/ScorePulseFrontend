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
    ? 'bg-[#FFFCE8] border-[#F5D000]'
    : 'bg-white border-[#e8e6e0] hover:border-[#F5D000] hover:-translate-y-0.5'

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={selectCard}
      onKeyDown={handleCardKeyDown}
      aria-pressed={isSelected}
      className={`rounded-[14px] p-4 border-2 transition-all duration-150 cursor-pointer ${cardClass}`}
    >
      {/* Top row */}
      <div className="flex justify-between items-center mb-3.5 gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-widest bg-[#F5F4EF]
             border-[1.5px] border-[#d9d6cf] text-gray-600 px-2.5 py-1 rounded-md leading-none">
          {match.sport}
        </span>
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide ${statusTone[match.status]}`}>
          <span className={`w-2 h-2 rounded-full ${statusDot[match.status]} ${match.status === 'live' ? 'animate-pulse' : ''}`} />
          {statusLabel[match.status]}
        </span>
      </div>

      {/* Score row */}
      <div className="flex items-center justify-between gap-3 my-3">
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-gray-700 truncate mb-1.5">
            {match.homeTeam}
          </p>
          <div
            className="inline-block min-w-12 text-center px-2.5 py-1
                       bg-[#F5D000] border-2 border-[#1a1a1a] rounded-lg"
            style={{ fontFamily: "'Barlow Condensed', 'Arial Black', sans-serif", fontSize: '34px', fontWeight: 800, lineHeight: 1 }}
          >
            {match.homeScore}
          </div>
        </div>

        <div className="text-[12px] font-bold text-gray-400 shrink-0 px-2">vs</div>

        <div className="flex-1 min-w-0 text-right">
          <p className="text-[13px] font-semibold text-gray-700 truncate mb-1.5">
            {match.awayTeam}
          </p>
          <div
            className="inline-block min-w-12 text-center px-2.5 py-1
                       bg-[#F5D000] border-2 border-[#1a1a1a] rounded-lg"
            style={{ fontFamily: "'Barlow Condensed', 'Arial Black', sans-serif", fontSize: '34px', fontWeight: 800, lineHeight: 1 }}
          >
            {match.awayScore}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2.5 mt-2 border-t-[1.5px] border-[#f0ede4] gap-2">
        <p className="text-[11px] text-gray-500 font-medium leading-none">{formattedTime}</p>

        {isSelected ? (
          <div className="flex items-center gap-2">
            <span
              className="px-4 py-1.5 text-[12px] font-bold uppercase tracking-wide
                         rounded-lg border-2 border-[#1a1a1a] bg-[#1a1a1a] text-[#F5D000] leading-none"
            >
              Watching Live
            </span>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onClose()
              }}
              className="px-3 py-1.5 ml-1.5 text-[12px] font-semibold uppercase tracking-wide
                         rounded-lg border-2 border-[#e0ddd4] bg-white text-[#1a1a1a]
                         hover:border-[#a9a9a9]"
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
            className="px-4 py-1.5 text-[12px] font-bold uppercase tracking-wide
                       rounded-lg border-2 border-[#1a1a1a] bg-[#F5D000] text-[#1a1a1a] leading-none"
          >
            Watch Live
          </button>
        )}
      </div>
    </article>
  )
}
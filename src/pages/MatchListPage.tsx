import { useEffect, useState } from 'react'
import MatchCard from '@/components/Matchcard'
import SkeletonCard from '@/components/SkeletonCard'
import LiveCommentaryPanel from '../components/LiveCommentaryPanel'
import { getMatches } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

export default function MatchListPage() {
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null)

  const { data: matches, isLoading, isError, refetch } = useQuery({
    queryKey: ['matches'],
    queryFn: () => getMatches(),
    refetchInterval: 30_000,
  })

  const safeMatches = Array.isArray(matches) ? matches : []

  useEffect(() => {
    if (selectedMatchId === null) return
    if (!safeMatches.some((match) => match.id === selectedMatchId)) {
      setSelectedMatchId(null)
    }
  }, [safeMatches, selectedMatchId])

  const hasSelection = selectedMatchId !== null

  return (
    <div className={`grid min-h-[calc(100vh-64px)] ${hasSelection ? 'lg:grid-cols-[minmax(0,1fr)_380px]' : 'grid-cols-1'}`}>
      <section className="bg-[#F5F4EF] p-6 lg:h-[calc(100vh-64px)] lg:overflow-y-auto">
        {/* Page header */}
        <div className="flex items-center justify-between mb-4 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-1.25 h-5.5 rounded-[3px] mr-2.5 bg-[#F5D000]" />
            <h1
              className="font-black text-[#1a1a1a] uppercase tracking-wide"
              style={{ fontFamily: "'Barlow Condensed', 'Arial Black', sans-serif", fontSize: '24px' }}
            >
              Current Matches
            </h1>
          </div>
          <button
            onClick={() => refetch()}
            className="text-xs font-bold uppercase tracking-wide text-gray-500
                     hover:text-[#1a1a1a] border-2 border-gray-200 hover:border-[#1a1a1a]
                     px-3 py-1.5 rounded-lg transition-all duration-150"
          >
            ↻ Refresh
          </button>
        </div>

        {isError && (
          <div className="text-center py-20 bg-white border-2 border-red-200 rounded-2xl mb-6">
            <p className="text-red-500 font-semibold mb-4">Failed to load matches.</p>
            <button
              onClick={() => refetch()}
              className="px-5 py-2 bg-[#F5D000] border-2 border-[#1a1a1a] text-[#1a1a1a]
                       font-bold uppercase tracking-wide rounded-xl text-xs transition-colors
                       hover:bg-[#e6c400]"
            >
              Retry
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : safeMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                isSelected={selectedMatchId === match.id}
                onWatchLive={setSelectedMatchId}
                onClose={() => setSelectedMatchId(null)}
              />
            ))
          }
        </div>

        {!isLoading && !isError && safeMatches.length === 0 && (
          <div className="text-center py-20 bg-white border-2 border-gray-200 rounded-2xl mt-6">
            <p className="text-gray-400 font-medium mb-2">No matches yet.</p>
            <Link
              to="/matches/new"
              className="text-sm font-bold text-[#1a1a1a] underline underline-offset-2 hover:text-[#c9ac00]"
            >
              Create one →
            </Link>
          </div>
        )}
      </section>

      {selectedMatchId !== null && (
        <aside className="bg-white border-t-2 border-[#e8e6e0] lg:border-t-0 lg:border-l-2 lg:border-[#e8e6e0] lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] lg:overflow-y-auto">
          <LiveCommentaryPanel matchId={selectedMatchId} />
        </aside>
      )}
    </div>
  )
}
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AddCommentaryForm from './AddCommentaryForm'
import CommentaryItem from './CommentaryItem'
import SkeletonCard from './SkeletonCard'
import { Commentary, getCommentary } from '@/lib/api'
import { useMatchSocket } from '@/lib/useMatchSocket'

interface Props {
  matchId: number
}

export default function LiveCommentaryPanel({ matchId }: Props) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['commentary', matchId],
    queryFn: () => getCommentary(matchId),
    enabled: Number.isFinite(matchId),
  })

  const { lastMessage } = useMatchSocket(matchId)
  const [feed, setFeed] = useState<Commentary[]>([])

  useEffect(() => {
    setFeed(data ?? [])
  }, [data, matchId])

  useEffect(() => {
    if (lastMessage?.type === 'commentary' && lastMessage.data?.matchId === matchId) {
      setFeed((prev) => [lastMessage.data as Commentary, ...prev])
    }
  }, [lastMessage, matchId])

  return (
    <div className="h-full bg-white">
      <div className="sticky top-0 z-20 h-12 bg-[#DCEEFF] border-b-2 border-[#b8d4f0] px-4.5 flex items-center justify-between">
        <h2
          className="uppercase text-[#1a3a5c] leading-none"
          style={{ fontFamily: "'Barlow Condensed', 'Arial Black', sans-serif", fontSize: '17px', fontWeight: 800, letterSpacing: '0.5px' }}
        >
          Live Commentary
        </h2>
        <span className="text-[10px] font-bold uppercase tracking-wide bg-[#1a3a5c] text-[#DCEEFF] px-2.5 py-1 rounded-md leading-none">
          Real-time
        </span>
      </div>

      <div className="p-3.5">
        {isError && (
          <div className="text-center py-8 bg-white border-2 border-red-200 rounded-lg mb-4">
            <p className="text-red-500 font-semibold mb-3 text-sm">Failed to load commentary.</p>
            <button
              onClick={() => refetch()}
              className="px-4 py-1.5 bg-[#F5D000] border-2 border-[#1a1a1a] text-[#1a1a1a]
                         font-bold uppercase tracking-wide rounded-lg text-xs hover:bg-[#e6c400]"
            >
              Retry
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : feed.length === 0 ? (
          <div className="text-center py-12 px-3 text-gray-400 text-sm font-medium border border-dashed border-[#e8e6e0] rounded-lg">
            No commentary yet. Add the first event below.
          </div>
        ) : (
          <div className="space-y-4">
            {feed.map((commentary) => (
              <CommentaryItem key={commentary.id} commentary={commentary} />
            ))}
          </div>
        )}

        <AddCommentaryForm matchId={matchId} />
      </div>
    </div>
  )
}

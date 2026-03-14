import { Commentary } from "@/lib/api"

interface Props {
  commentary: Commentary
}

const eventBadge: Record<string, string> = {
  four:         'bg-emerald-50 border-emerald-400 text-emerald-800',
  six:          'bg-blue-50 border-blue-400 text-blue-800',
  wicket:       'bg-red-50 border-red-400 text-red-800',
  goal:         'bg-yellow-50 border-yellow-400 text-yellow-800',
  penalty:      'bg-orange-50 border-orange-400 text-orange-800',
  pass:         'bg-green-50 border-green-400 text-green-800',
  substitution: 'bg-blue-50 border-blue-400 text-blue-800',
  yellow_card:  'bg-yellow-50 border-yellow-400 text-yellow-800',
  red_card:     'bg-red-50 border-red-400 text-red-800',
  kickoff:      'bg-gray-50 border-gray-300 text-gray-700',
}

const defaultBadge = 'bg-gray-50 border-gray-300 text-gray-700'

export default function CommentaryItem({ commentary }: Props) {
  const key = commentary.eventType?.toLowerCase() ?? ''
  const badgeClass = eventBadge[key] ?? defaultBadge

  return (
    <div className="flex items-start gap-2.5">
      {/* Yellow dot */}
      <div className="shrink-0 w-2.25 h-2.25 rounded-full bg-[#F5D000] border-2 border-[#1a1a1a] mt-1" />

      <div className="flex-1 min-w-0">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-1.25 mb-1.25">
          <span className="text-[10px] text-gray-400 font-medium leading-none">
            {new Date(commentary.createdAt ?? Date.now()).toLocaleTimeString(undefined, {
              hour: '2-digit', minute: '2-digit', second: '2-digit'
            })}
          </span>
          <span className="text-[10px] font-semibold bg-[#F5F4EF] border-[1.5px] border-gray-200
                           rounded-[5px] px-1.5 py-0.5 text-gray-700 leading-none">
            {commentary.minute}'
          </span>
          <span className="text-[10px] text-gray-400 font-medium leading-none">
            Seq {commentary.sequence} · {commentary.period}
          </span>
          <span className={`text-[9px] font-bold uppercase tracking-[0.8px] leading-none
                            border-[1.5px] rounded-[5px] px-2 py-0.5 ${badgeClass}`}>
            {commentary.eventType}
          </span>
        </div>

        {/* Actor + team */}
        <div className="flex items-center gap-1 mb-1.25">
          <span className="text-[12px] font-bold text-[#1a1a1a] mr-1">{commentary.actor}</span>
          <span className="text-[11px] text-gray-400">·</span>
          <span className="text-[11px] text-gray-500 font-medium">{commentary.team}</span>
        </div>

        {/* Message bubble */}
        <p className="text-[12px] text-gray-700 leading-normal bg-[#FAFAF7]
                      border-[1.5px] border-[#e8e6e0] rounded-lg px-2.5 py-2 mt-1.25 mb-1.25">
          {commentary.message}
        </p>

        {/* Tags */}
        {commentary.tags && commentary.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {commentary.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium bg-[#F5F4EF] border-[1.5px] border-[#e0ddd4]
                           text-gray-500 px-2 py-0.5 rounded-[5px] leading-none"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
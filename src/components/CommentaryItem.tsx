import { Commentary } from "@/lib/api"

interface Props {
  commentary: Commentary
}

export default function CommentaryItem({ commentary }: Props) {
  return (
    <div className="flex items-start gap-3 mb-6">
      {/* Orange dot */}
      <div className="shrink-0 w-2.5 h-2.5 rounded-full bg-[#FF8C00] border-2 border-[#1a1a1a] mt-1" />

      <div className="flex-1 min-w-0">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-[10px] text-gray-500 font-medium leading-none">
            {new Date(commentary.createdAt ?? Date.now()).toLocaleTimeString(undefined, {
              hour: '2-digit', minute: '2-digit'
            })}
          </span>
          <span className="text-[10px] font-semibold bg-[#F5F4EF] border-2 border-[#1a1a1a]
                           rounded-md px-2 py-0.5 text-gray-700 leading-none">
            {commentary.minute}'
          </span>
          <span className="text-[10px] text-gray-500 font-medium leading-none">
            Seq {commentary.sequence} · {commentary.period}
          </span>
          <span className={`text-[9px] font-bold uppercase tracking-[0.8px] leading-none
                            border-2 rounded-md px-2 py-0.5 bg-[#F5D000] border-[#1a1a1a] text-[#1a1a1a]`}>
            {commentary.eventType}
          </span>
        </div>

        {/* Actor + team */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[13px] font-bold text-[#1a1a1a]">{commentary.actor}</span>
          <span className="text-[11px] text-gray-400">·</span>
          <span className="text-[11px] text-gray-500 font-medium">{commentary.team}</span>
        </div>

        {/* Message bubble */}
        <p className="text-[12px] text-gray-700 leading-relaxed bg-[#FAFAF7]
                      border-2 border-[#e8e6e0] rounded-lg px-3 py-2 mb-2">
          {commentary.message}
        </p>

        {/* Tags */}
        {commentary.tags && commentary.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {commentary.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-medium bg-[#F5F4EF] border-2 border-[#e0ddd4]
                           text-gray-500 px-2 py-0.5 rounded-md leading-none uppercase"
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
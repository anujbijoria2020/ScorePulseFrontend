import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createCommentary, CreateCommentaryPayload } from '@/lib/api'

interface Props {
  matchId: number
}

const empty: CreateCommentaryPayload = {
  minute: 0,
  sequence: 1,
  period: '',
  eventType: '',
  actor: '',
  team: '',
  message: '',
  tags: [],
}

export default function AddCommentaryForm({ matchId }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<CreateCommentaryPayload>(empty)
  const [tagsInput, setTagsInput] = useState('')
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: CreateCommentaryPayload) => createCommentary(matchId, data),
    onSuccess: () => {
      toast.success('Commentary added!')
      queryClient.invalidateQueries({ queryKey: ['commentary', matchId] })
      setForm(empty)
      setTagsInput('')
      setOpen(false)
    },
    onError: () => {
      toast.error('Failed to add commentary')
    },
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean)
    mutation.mutate({ ...form, tags })
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'minute' || name === 'sequence' ? Number(value) : value,
    }))
  }

  return (
    <div className="mt-6">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300
                   text-gray-400 hover:border-[#1a1a1a] hover:text-[#1a1a1a]
                   font-bold uppercase tracking-wide text-xs transition-all duration-150"
      >
        {open ? '✕ Close Form' : '＋ Add Commentary'}
      </button>

      {open && (
        <div className="mt-4 bg-white border-2 border-gray-200 rounded-2xl p-5 space-y-4">
          <h3
            className="font-black text-[#1a1a1a] uppercase tracking-wide text-base border-b-2 border-gray-100 pb-3"
            style={{ fontFamily: "'Barlow Condensed', 'Arial Black', sans-serif" }}
          >
            New Commentary Entry
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Minute">
              <input
                type="number" name="minute" value={form.minute}
                onChange={handleChange} required className={inputCls}
              />
            </Field>
            <Field label="Sequence">
              <input
                type="number" name="sequence" value={form.sequence}
                onChange={handleChange} required className={inputCls}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Period">
              <input
                type="text" name="period" value={form.period}
                onChange={handleChange} placeholder="1st half" required className={inputCls}
              />
            </Field>
            <Field label="Event Type">
              <input
                type="text" name="eventType" value={form.eventType}
                onChange={handleChange} placeholder="goal, pass, wicket…" required className={inputCls}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Actor">
              <input
                type="text" name="actor" value={form.actor}
                onChange={handleChange} placeholder="A. Sharma" required className={inputCls}
              />
            </Field>
            <Field label="Team">
              <input
                type="text" name="team" value={form.team}
                onChange={handleChange} placeholder="Mumbai Mavericks" required className={inputCls}
              />
            </Field>
          </div>

          <Field label="Message">
            <textarea
              name="message" value={form.message}
              onChange={handleChange} rows={3}
              placeholder="Describe the event…"
              required className={inputCls + ' resize-none'}
            />
          </Field>

          <Field label="Tags (comma-separated)">
            <input
              type="text" value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="goal, t20, boundary"
              className={inputCls}
            />
          </Field>

          <button
            onClick={handleSubmit}
            disabled={mutation.isPending}
            className="w-full py-3 bg-[#F5D000] border-2 border-[#1a1a1a] hover:bg-[#e6c400]
                       disabled:opacity-50 text-[#1a1a1a] font-extrabold uppercase tracking-wide
                       text-sm rounded-xl transition-colors"
          >
            {mutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a] rounded-full animate-spin" />
                Submitting…
              </span>
            ) : (
              'Submit Commentary'
            )}
          </button>
        </div>
      )}
    </div>
  )
}

const inputCls =
  'w-full bg-[#F5F4EF] border-2 border-gray-200 rounded-lg px-3 py-2 text-sm ' +
  'text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:border-[#F5D000] ' +
  'focus:bg-white transition-all duration-150'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
        {label}
      </label>
      {children}
    </div>
  )
}
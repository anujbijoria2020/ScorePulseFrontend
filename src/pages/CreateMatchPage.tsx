import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createMatch, CreateMatchPayload } from '@/lib/api'

const empty: CreateMatchPayload = {
  sport: '',
  homeTeam: '',
  awayTeam: '',
  startTime: '',
  endTime: '',
  homeScore: 0,
  awayScore: 0,
}

export default function CreateMatchPage() {
  const [form, setForm] = useState<CreateMatchPayload>(empty)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createMatch,
    onSuccess: () => {
      toast.success('Match created!')
      queryClient.invalidateQueries({ queryKey: ['matches'] })
      navigate('/')
    },
    onError: () => {
      toast.error('Failed to create match')
    },
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'homeScore' || name === 'awayScore' ? Number(value) : value,
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    mutation.mutate(form)
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Page heading */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-7 bg-[#F5D000] border-2 border-[#1a1a1a] rounded-sm" />
        <h1
          className="font-black text-[#1a1a1a] uppercase tracking-wide"
          style={{ fontFamily: "'Barlow Condensed', 'Arial Black', sans-serif", fontSize: '24px' }}
        >
          Create New Match
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border-2 border-gray-200 rounded-2xl p-6 space-y-5"
      >
        <Field label="Sport">
          <input
            type="text" name="sport" value={form.sport}
            onChange={handleChange} placeholder="cricket, football…"
            required className={inputCls}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Home Team">
            <input
              type="text" name="homeTeam" value={form.homeTeam}
              onChange={handleChange} placeholder="Mumbai Mavericks"
              required className={inputCls}
            />
          </Field>
          <Field label="Away Team">
            <input
              type="text" name="awayTeam" value={form.awayTeam}
              onChange={handleChange} placeholder="Delhi Dynamos"
              required className={inputCls}
            />
          </Field>
        </div>

        {/* Score preview strip */}
        <div className="bg-[#F5F4EF] border-2 border-gray-200 rounded-xl p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
            Initial Score
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Home Score">
              <input
                type="number" name="homeScore" value={form.homeScore}
                onChange={handleChange} min={0}
                required className={inputCls}
              />
            </Field>
            <Field label="Away Score">
              <input
                type="number" name="awayScore" value={form.awayScore}
                onChange={handleChange} min={0}
                required className={inputCls}
              />
            </Field>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Start Time">
            <input
              type="datetime-local" name="startTime" value={form.startTime}
              onChange={handleChange} required className={inputCls}
            />
          </Field>
          <Field label="End Time">
            <input
              type="datetime-local" name="endTime" value={form.endTime}
              onChange={handleChange} required className={inputCls}
            />
          </Field>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full py-3.5 bg-[#F5D000] border-2 border-[#1a1a1a]
                     hover:bg-[#e6c400] disabled:opacity-50 text-[#1a1a1a]
                     font-extrabold uppercase tracking-widest text-sm
                     rounded-xl transition-colors"
        >
          {mutation.isPending ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a]
                               rounded-full animate-spin" />
              Creating…
            </span>
          ) : (
            'Create Match'
          )}
        </button>
      </form>
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
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

console.log('API Base URL:', BASE_URL);
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─── Types ────────────────────────────────────────────────────────────────────

export type MatchStatus = 'scheduled' | 'live' | 'finished';

export interface Match {
  id: number
  sport: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  status: MatchStatus
  startTime: string
  endTime: string
  createdAt: string
}

export interface CreateMatchPayload {
  sport: string
  homeTeam: string
  awayTeam: string
  startTime: string
  endTime: string
  homeScore: number
  awayScore: number
}

export interface Commentary {
  id: number
  matchId: number
  minute: number
  sequence: number
  period: string
  eventType: string
  actor: string
  team: string
  message: string
  metadata?: Record<string, unknown>
  tags?: string[]
  createdAt: string
}

export interface CreateCommentaryPayload {
  minute: number
  sequence: number
  period: string
  eventType: string
  actor: string
  team: string
  message: string
  metadata?: Record<string, unknown>
  tags?: string[]
}

// ─── API Functions ────────────────────────────────────────────────────────────

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export async function getMatches(limit = 50): Promise<Match[]> {
  const res = await apiClient.get<ApiResponse<Match[]>>('/api/matches', {
    params: { limit },
  })
  return res.data.data
}

export async function createMatch(data: CreateMatchPayload): Promise<Match> {
  const res = await apiClient.post<ApiResponse<Match>>('/api/matches', data)
  return res.data.data
}

export async function getCommentary(
  matchId: number,
  limit = 100
): Promise<Commentary[]> {
  const res = await apiClient.get<ApiResponse<Commentary[]>>(
    `/api/matches/${matchId}/commentary`,
    { params: { limit } }
  )
  return res.data.data
}

export async function createCommentary(
  matchId: number,
  data: CreateCommentaryPayload
): Promise<Commentary> {
  const res = await apiClient.post<ApiResponse<Commentary>>(
    `/api/matches/${matchId}/commentary`,
    data
  )
  return res.data.data
}
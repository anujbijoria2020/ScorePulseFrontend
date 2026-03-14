import { useEffect, useRef, useState, useCallback } from 'react'

const WS_URL = import.meta.env.VITE_WS_URL ?? 'ws://localhost:8000/ws'

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected'

export interface WsMessage {
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
  matchId?: number
  message?: string
}

interface UseMatchSocketReturn {
  lastMessage: WsMessage | null
  connectionStatus: ConnectionStatus
}

export function useMatchSocket(matchId?: number): UseMatchSocketReturn {
  const wsRef = useRef<WebSocket | null>(null)
  const prevMatchIdRef = useRef<number | undefined>(undefined)
  const [lastMessage, setLastMessage] = useState<WsMessage | null>(null)
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>('connecting')

  const sendJson = useCallback((payload: object) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload))
    }
  }, [])

  useEffect(() => {
    const ws = new WebSocket(WS_URL)
    wsRef.current = ws
    setConnectionStatus('connecting')

    ws.onopen = () => {
      setConnectionStatus('connected')
      if (matchId !== undefined) {
        sendJson({ type: 'subscribe', matchId })
        prevMatchIdRef.current = matchId
      }
    }

    ws.onmessage = (event: MessageEvent) => {
      try {
        const parsed: WsMessage = JSON.parse(event.data as string)
        setLastMessage(parsed)
      } catch {
        // ignore malformed messages
      }
    }

    ws.onclose = () => setConnectionStatus('disconnected')
    ws.onerror = () => setConnectionStatus('disconnected')

    return () => {
      ws.close()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle matchId changes after initial connect
  useEffect(() => {
    if (connectionStatus !== 'connected') return

    const prev = prevMatchIdRef.current

    if (prev !== undefined && prev !== matchId) {
      sendJson({ type: 'unsubscribe', matchId: prev })
    }

    if (matchId !== undefined && matchId !== prev) {
      sendJson({ type: 'subscribe', matchId })
    }

    prevMatchIdRef.current = matchId
  }, [matchId, connectionStatus, sendJson])

  return { lastMessage, connectionStatus }
}
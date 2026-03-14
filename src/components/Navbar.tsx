import { ConnectionStatus } from '@/lib/useMatchSocket'
import { Link, useLocation } from 'react-router-dom'

interface Props {
  connectionStatus: ConnectionStatus
}

const statusDot: Record<ConnectionStatus, string> = {
  connected: 'bg-emerald-500',
  connecting: 'bg-yellow-500 animate-pulse',
  disconnected: 'bg-red-500',
}

const statusLabel: Record<ConnectionStatus, string> = {
  connected: 'CONNECTED',
  connecting: 'CONNECTING',
  disconnected: 'OFFLINE',
}

export default function Navbar({ connectionStatus }: Props) {
  const location = useLocation()

  const navLink = (to: string, label: string) => {
    const active = location.pathname === to
    return (
      <Link
        to={to}
        className={`text-[13px] font-bold uppercase tracking-wide px-4 py-1.5
          rounded-lg border-2 transition-all duration-150 whitespace-nowrap leading-none
          ${active
            ? 'bg-[#1a1a1a] text-[#F5D000] border-[#1a1a1a]'
            : 'bg-transparent text-[#1a1a1a] border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#F5D000]'
          }`}
      >
        {label}
      </Link>
    )
  }

  return (
    <nav className="bg-[#F5D000] border-b-2 border-[#1a1a1a] sticky top-0 z-50">
      <div className="h-16 w-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-col items-start leading-none">
          <span
            className="font-black text-[#1a1a1a] tracking-tight"
            style={{ fontFamily: "'Barlow Condensed', 'Arial Black', sans-serif", fontSize: '28px', letterSpacing: '-0.5px' }}
          >
            Spotrz
          </span>
          <span className="text-[11px] font-semibold text-[#5a5200] tracking-wide uppercase">
            Real-time match data
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {navLink('/', 'Matches')}
          {navLink('/matches/new', 'New Match')}

          {/* WS status pill */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-2 bg-white border-[1.5px] border-[#1a1a1a] rounded-full px-4 py-1.5">
              <span className={`w-2 h-2 rounded-full ${statusDot[connectionStatus]}`} />
              <span className="text-[12px] font-bold text-[#1a1a1a] uppercase tracking-wide leading-none">
                LIVE {statusLabel[connectionStatus]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
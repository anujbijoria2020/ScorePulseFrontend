import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import MatchListPage from './pages/MatchListPage'
import CreateMatchPage from './pages/CreateMatchPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MatchListPage />} />
        <Route path="/matches/new" element={<CreateMatchPage />} />
        <Route path="/matches/:id" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
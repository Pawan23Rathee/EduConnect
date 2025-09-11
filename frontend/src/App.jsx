import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Upload from './pages/Upload'
import VideoDetail from './pages/VideoDetail'

export default function App() {
  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <header>
        <h1>EduConnect</h1>
        <nav style={{ marginBottom: 20 }}>
          <Link to="/">Home</Link> | <Link to="/upload">Upload</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/video/:id" element={<VideoDetail />} />
      </Routes>
    </div>
  )
}

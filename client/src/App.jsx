import Hero from './pages/Hero'
import Login from './pages/Login'
import Register from './pages/Register'

import ProtectedRoute from './components/ProtectedRoute'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PlanRaceWeekend from './pages/PlanRaceWeekend'
import TrackRaceWeekends from './pages/TrackRaceWeekends'

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/hero" element={<ProtectedRoute><Hero /></ProtectedRoute>} />
          <Route exact path="/planrace" element={<ProtectedRoute><PlanRaceWeekend /></ProtectedRoute>} />
          <Route exact path="/trackrace" element={<ProtectedRoute><TrackRaceWeekends /></ProtectedRoute>} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

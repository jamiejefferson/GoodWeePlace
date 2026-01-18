import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import WhatItMeansPage from './pages/WhatItMeansPage'
import FormsPage from './pages/FormsPage'
import AdminPage from './pages/AdminPage'
import PressReleasePage from './pages/PressReleasePage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import Layout from './components/Layout'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/what-it-means" element={<WhatItMeansPage />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/press-release" element={<PressReleasePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

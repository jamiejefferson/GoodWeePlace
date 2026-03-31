import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { motionTokens } from './motion/motionTokens'
import HomePage from './pages/HomePage'
import WhatItMeansPage from './pages/WhatItMeansPage'
import FormsPage from './pages/FormsPage'
import AdminPage from './pages/AdminPage'
import PressReleasePage from './pages/PressReleasePage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import Layout from './components/Layout'

function AnimatedRoutes() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname + location.search}
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: motionTokens.duration.base, ease: motionTokens.ease.out }
        }
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/what-it-means" element={<WhatItMeansPage />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/press-release" element={<PressReleasePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  )
}

export default App

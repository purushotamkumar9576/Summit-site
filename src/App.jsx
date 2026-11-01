import { MotionConfig } from 'framer-motion'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Outcomes from './components/Outcomes.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Trust from './components/Trust.jsx'
import Faq from './components/Faq.jsx'
import Rooms from './components/Rooms.jsx'
import Engines from './components/Engines.jsx'
import Team from './components/Team.jsx'
import Podcasts from './components/Podcasts.jsx'
import Cta from './components/Cta.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    // reducedMotion="user" makes every framer-motion animation respect the visitor's OS setting.
    <MotionConfig reducedMotion="user">
      <Header />
      <main id="top">
        <Hero />
        <Marquee />
        <Outcomes />
        <HowItWorks />
        <Rooms />
        <Engines />
        <Team />
        <Podcasts />
        <Trust />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </MotionConfig>
  )
}

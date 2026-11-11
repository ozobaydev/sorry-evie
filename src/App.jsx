import { MotionConfig } from 'framer-motion'
import { StoryProvider } from './context/StoryContext'
import useIdleSections from './hooks/useIdleSections'
import Navbar from './components/Navbar'
import OpeningSection from './components/OpeningSection'
import ApologyLetter from './components/ApologyLetter'
import StoryChapter from './components/StoryChapter'
import MemoryGallery from './components/MemoryGallery'
import MemoryConstellation from './components/MemoryConstellation'
import LetterSection from './components/LetterSection'
import PromiseSection from './components/PromiseSection'
import NewBeginning from './components/NewBeginning'
import ForgivenessGame from './components/ForgivenessGame'
import FinalMessage from './components/FinalMessage'
import Footer from './components/Footer'
import ScrollProgress from './components/ui/ScrollProgress'

/** The story, in order. */
export default function App() {
  // pause ambient animation for sections that are nowhere near the viewport
  useIdleSections()

  return (
    // reducedMotion="user" makes every Framer animation honour the OS setting
    <MotionConfig reducedMotion="user">
      <StoryProvider>
        <ScrollProgress />
        <Navbar />
        <main>
          <OpeningSection />
          <ApologyLetter />
          <StoryChapter />
          <MemoryGallery />
          <MemoryConstellation />
          <LetterSection />
          <PromiseSection />
          <NewBeginning />
          <ForgivenessGame />
          <FinalMessage />
        </main>
        <Footer />
      </StoryProvider>
    </MotionConfig>
  )
}

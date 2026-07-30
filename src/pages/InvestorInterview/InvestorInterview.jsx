import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import usePitchStore from '../../store/usePitchStore'
import useInterviewStore from '../../store/useInterviewStore'
import { INVESTORS } from '../../data/investors'
import InterviewLayout from '../../components/InterviewLayout/InterviewLayout'
import InvestorSidebar from '../../components/InvestorSidebar/InvestorSidebar'
import InterviewHeader from '../../components/InterviewHeader/InterviewHeader'
import ChatBubble from '../../components/ChatBubble/ChatBubble'
import TypingIndicator from '../../components/TypingIndicator/TypingIndicator'
import ChatInput from '../../components/ChatInput/ChatInput'
import './InvestorInterview.css'

const RESULTS_REDIRECT_DELAY_MS = 1500

function InvestorInterview() {
  const navigate = useNavigate()
  const pitch = usePitchStore((state) => state.pitch)
  const isSubmitted = usePitchStore((state) => state.isSubmitted)

  const messages = useInterviewStore((state) => state.messages)
  const currentInvestorIndex = useInterviewStore((state) => state.currentInvestorIndex)
  const currentStep = useInterviewStore((state) => state.currentStep)
  const phase = useInterviewStore((state) => state.phase)
  const isTyping = useInterviewStore((state) => state.isTyping)
  const isFinished = useInterviewStore((state) => state.isFinished)
  const error = useInterviewStore((state) => state.error)
  const requestInvestorTurn = useInterviewStore((state) => state.requestInvestorTurn)
  const submitAnswer = useInterviewStore((state) => state.submitAnswer)

  const [draft, setDraft] = useState('')
  const messagesEndRef = useRef(null)
  const lastRequestedKey = useRef(null)
  const currentInvestor = INVESTORS[currentInvestorIndex]

  // Asks Claude for the current investor's next line (intro, question, or
  // decision) whenever the conversation pointer moves. The ref guards
  // against firing twice for the same turn (e.g. React StrictMode).
  useEffect(() => {
    if (!isSubmitted || isFinished) return

    const key = `${currentInvestorIndex}-${currentStep}-${phase}`
    if (lastRequestedKey.current === key) return
    lastRequestedKey.current = key

    requestInvestorTurn(pitch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentInvestorIndex, currentStep, phase, isSubmitted, isFinished])

  useEffect(() => {
    if (!isFinished) return undefined
    const timer = setTimeout(() => navigate('/results'), RESULTS_REDIRECT_DELAY_MS)
    return () => clearTimeout(timer)
  }, [isFinished, navigate])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  if (!isSubmitted) {
    return (
      <section className="investor-interview">
        <div className="container investor-interview__inner">
          <h1>No Pitch Submitted Yet</h1>
          <p>Submit your startup details first to meet your AI investors.</p>
          <Link to="/pitch" className="btn btn--primary">
            Go to Pitch Form
          </Link>
        </div>
      </section>
    )
  }

  const handleSend = () => {
    const trimmed = draft.trim()
    if (!trimmed || isTyping || isFinished) return
    submitAnswer(trimmed)
    setDraft('')
  }

  return (
    <section className="investor-interview">
      <InterviewLayout
        sidebar={
          <InvestorSidebar
            currentInvestorIndex={currentInvestorIndex}
            isFinished={isFinished}
          />
        }
      >
        <InterviewHeader investor={currentInvestor} isFinished={isFinished} />

        <div className="investor-interview__messages">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              sender={message.sender}
              text={message.text}
              investor={INVESTORS.find((inv) => inv.id === message.investorId)}
            />
          ))}
          {isTyping && !isFinished && <TypingIndicator investor={currentInvestor} />}
          <div ref={messagesEndRef} />
        </div>

        {error && (
          <div className="investor-interview__error">
            <span>{error}</span>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => requestInvestorTurn(pitch)}
            >
              Retry
            </button>
          </div>
        )}

        <ChatInput
          value={draft}
          onChange={setDraft}
          onSend={handleSend}
          disabled={isTyping || isFinished}
          placeholder={
            isFinished
              ? 'Interview complete — redirecting...'
              : 'Type your answer...'
          }
        />
      </InterviewLayout>
    </section>
  )
}

export default InvestorInterview

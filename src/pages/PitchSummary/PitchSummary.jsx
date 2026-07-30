import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SummaryCard from '../../components/SummaryCard/SummaryCard'
import usePitchStore from '../../store/usePitchStore'
import './PitchSummary.css'

function PitchSummary() {
  const navigate = useNavigate()
  const pitch = usePitchStore((state) => state.pitch)
  const isSubmitted = usePitchStore((state) => state.isSubmitted)
  const [isLoading, setIsLoading] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    },
    [],
  )

  if (!isSubmitted) {
    return (
      <section className="pitch-summary">
        <div className="container pitch-summary__empty">
          <h1>No Pitch Submitted Yet</h1>
          <p>Fill out your startup details before reviewing your summary.</p>
          <Link to="/pitch" className="btn btn--primary">
            Go to Pitch Form
          </Link>
        </div>
      </section>
    )
  }

  const handleMeetInvestors = () => {
    setIsLoading(true)
    timeoutRef.current = window.setTimeout(() => {
      navigate('/interview')
    }, 3000)
  }

  if (isLoading) {
    return (
      <section className="pitch-summary">
        <div className="container pitch-summary__loading">
          <div className="pitch-summary__spinner" aria-hidden="true" />
          <p>The investors are reviewing your company...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="pitch-summary">
      <div className="container">
        <div className="pitch-summary__header">
          <h1>Review Your Pitch</h1>
          <p>Make sure everything looks right before meeting your investors.</p>
        </div>

        <div className="pitch-summary__grid">
          <SummaryCard
            title="Company Information"
            items={[
              { label: 'Company Name', value: pitch.companyName },
              { label: 'Industry', value: pitch.industry },
              { label: 'Founder Story', value: pitch.founderStory },
            ]}
          />
          <SummaryCard
            title="Business Model"
            items={[
              { label: 'Problem', value: pitch.problem },
              { label: 'Solution', value: pitch.solution },
              { label: 'Target Customer', value: pitch.targetCustomer },
              { label: 'Business Model', value: pitch.businessModel },
            ]}
          />
          <SummaryCard
            title="Financial Information"
            items={[
              { label: 'Current Revenue', value: pitch.currentRevenue },
              { label: 'Monthly Growth Rate', value: pitch.monthlyGrowthRate },
              { label: 'Valuation', value: pitch.valuation },
            ]}
          />
          <SummaryCard
            title="Investment Request"
            items={[
              {
                label: 'Investment Amount Requested',
                value: pitch.investmentAmount,
              },
              { label: 'Equity Offered', value: pitch.equityOffered },
            ]}
          />
        </div>

        <div className="pitch-summary__actions">
          <Link to="/pitch" className="btn btn--secondary">
            Edit Pitch
          </Link>
          <button
            type="button"
            className="btn btn--primary"
            onClick={handleMeetInvestors}
          >
            Meet the Investors
          </button>
        </div>
      </div>
    </section>
  )
}

export default PitchSummary

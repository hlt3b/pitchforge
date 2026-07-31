import { Link } from 'react-router-dom'
import usePitchStore from '../../store/usePitchStore'
import useInterviewStore from '../../store/useInterviewStore'
import { INVESTORS } from '../../data/investors'
import SummaryCard from '../../components/SummaryCard/SummaryCard'
import './Results.css'

function Results() {
  const pitch = usePitchStore((state) => state.pitch)
  const decisions = useInterviewStore((state) => state.decisions)

  const hasResults = Object.keys(decisions).length > 0

  if (!hasResults) {
    return (
      <section className="results">
        <div className="container results__inner">
          <h1>No Results Yet</h1>
          <p>Complete an investor interview to see your deals here.</p>
          <Link to="/pitch" className="btn btn--primary">
            Start a Pitch
          </Link>
        </div>
      </section>
    )
  }

  const dealCount = Object.values(decisions).filter((d) => d.outcome === 'Deal').length
  const counterCount = Object.values(decisions).filter(
    (d) => d.outcome === 'Counter Offer',
  ).length
  const noDealCount = Object.values(decisions).filter((d) => d.outcome === 'No Deal').length

  return (
    <section className="results">
      <div className="container">
        <div className="results__header">
          <span className="results__eyebrow">Interview Complete</span>
          <h1>Your Results, {pitch.companyName || 'Founder'}</h1>
          <p>
            {dealCount} Deal{dealCount === 1 ? '' : 's'} · {counterCount} Counter Offer
            {counterCount === 1 ? '' : 's'} · {noDealCount} No Deal{noDealCount === 1 ? '' : 's'}
          </p>
          <p className="results__note">
            This is your own private view — only visible in this browser.
          </p>
        </div>

        <div className="results__grid">
          {INVESTORS.map((investor) => {
            const decision = decisions[investor.id]
            if (!decision) return null

            const items = [{ label: 'Decision', value: decision.outcome }]
            if (decision.outcome !== 'No Deal') {
              items.push({
                label: 'Investment Amount',
                value:
                  decision.investmentAmount != null
                    ? `$${Number(decision.investmentAmount).toLocaleString()}`
                    : null,
              })
              items.push({
                label: 'Equity Requested',
                value: decision.equityRequested != null ? `${decision.equityRequested}%` : null,
              })
            }
            items.push({ label: 'Reasoning', value: decision.reasoning })
            items.push({
              label: 'Confidence Score',
              value: `${decision.confidenceScore}/100`,
            })

            return (
              <SummaryCard
                key={investor.id}
                title={`${investor.name} — ${investor.style}`}
                items={items}
              />
            )
          })}
        </div>

        <div className="results__actions">
          <Link to="/" className="btn btn--primary">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Results

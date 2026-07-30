import { Link } from 'react-router-dom'
import usePitchStore from '../../store/usePitchStore'
import './InvestorInterview.css'

function InvestorInterview() {
  const pitch = usePitchStore((state) => state.pitch)
  const isSubmitted = usePitchStore((state) => state.isSubmitted)

  if (!isSubmitted) {
    return (
      <section className="investor-interview">
        <div className="container investor-interview__inner">
          <h1>No Pitch Submitted Yet</h1>
          <p>Submit your startup details first to meet your AI investors.</p>
          <Link to="/pitch-form" className="btn btn--primary">
            Go to Pitch Form
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="investor-interview">
      <div className="container investor-interview__inner">
        <span className="investor-interview__eyebrow">Investor Interview</span>
        <h1>Thanks, {pitch.companyName}!</h1>
        <p>
          Your pitch has been received. Your AI investor panel is getting
          ready to review it.
        </p>
        <p className="investor-interview__note">
          AI investor conversations powered by Claude are coming soon.
        </p>
      </div>
    </section>
  )
}

export default InvestorInterview

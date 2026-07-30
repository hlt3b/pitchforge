import { Link } from 'react-router-dom'
import usePitchStore from '../../store/usePitchStore'
import './Results.css'

function Results() {
  const pitch = usePitchStore((state) => state.pitch)

  return (
    <section className="results">
      <div className="container results__inner">
        <span className="results__eyebrow">Interview Complete</span>
        <h1>Nice work, {pitch.companyName || 'founder'}!</h1>
        <p>
          You've made it through all four investors. Detailed scoring,
          feedback, and investment offers are coming soon.
        </p>
        <Link to="/" className="btn btn--primary">
          Back to Home
        </Link>
      </div>
    </section>
  )
}

export default Results

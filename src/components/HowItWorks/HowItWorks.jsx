import './HowItWorks.css'

const STEPS = [
  { number: 1, text: 'Submit your startup idea.' },
  { number: 2, text: 'Pitch your business to four AI investors.' },
  { number: 3, text: 'Receive investment offers and detailed feedback.' },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <h2 className="section-title">How It Works</h2>

        <div className="how-it-works__steps">
          {STEPS.map((step) => (
            <div className="step-card" key={step.number}>
              <span className="step-card__number">{step.number}</span>
              <h3 className="step-card__title">Step {step.number}</h3>
              <p className="step-card__text">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

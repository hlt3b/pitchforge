import './Hero.css'

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__glow hero__glow--one" aria-hidden="true" />
      <div className="hero__glow hero__glow--two" aria-hidden="true" />

      <div className="container hero__inner">
        <h1 className="hero__title">PitchForge</h1>
        <p className="hero__subtitle">
          Practice pitching your startup to four AI investors inspired by
          legendary business minds. Answer tough questions, negotiate deals,
          and improve your entrepreneurial skills.
        </p>
        <div className="hero__actions">
          <a href="#how-it-works" className="btn btn--primary">
            Start Pitch
          </a>
          <a href="#deals" className="btn btn--secondary">
            View Deals
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero

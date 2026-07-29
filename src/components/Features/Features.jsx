import './Features.css'

const FEATURES = [
  {
    title: 'AI Investors',
    description:
      'Pitch to four distinct AI personas, each modeled after legendary investor styles and strategies.',
    icon: (
      <path d="M12 2a5 5 0 0 0-5 5v1.1A5 5 0 0 0 4 13v2a5 5 0 0 0 5 5h1v-3a1 1 0 1 1 2 0v3h1a5 5 0 0 0 5-5v-2a5 5 0 0 0-3-4.6V7a5 5 0 0 0-3-4.58V7a1 1 0 1 1-2 0V2Z" />
    ),
  },
  {
    title: 'Instant Feedback',
    description:
      'Get real-time, detailed critique on your pitch delivery, strengths, and weaknesses.',
    icon: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />,
  },
  {
    title: 'Investment Deals',
    description:
      'Negotiate terms and walk away with real investment offers based on how you pitch.',
    icon: <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v1h4V6a2 2 0 0 0-2-2Z" />,
  },
  {
    title: 'Public Deal Gallery',
    description:
      'Browse pitches and closed deals from the community for inspiration and ideas.',
    icon: (
      <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" />
    ),
  },
]

function Features() {
  return (
    <section id="deals" className="features">
      <div className="container">
        <h2 className="section-title">Everything You Need to Nail Your Pitch</h2>

        <div className="features__grid">
          {FEATURES.map((feature) => (
            <div className="feature-card" key={feature.title}>
              <svg
                className="feature-card__icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                {feature.icon}
              </svg>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__description">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

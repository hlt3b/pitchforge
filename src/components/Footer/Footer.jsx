import './Footer.css'

function Footer() {
  return (
    <footer id="about" className="footer">
      <div className="container footer__inner">
        <span className="footer__brand">PitchForge</span>
        <p className="footer__tagline">
          Built with React, Claude AI, Supabase, and Netlify.
        </p>
      </div>
    </footer>
  )
}

export default Footer

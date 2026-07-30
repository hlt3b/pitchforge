import './InvestorCard.css'

const STATUS_LABELS = {
  waiting: 'Waiting',
  interviewing: 'Interviewing',
  finished: 'Finished',
}

function InvestorCard({ investor, status }) {
  const initials = investor.name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <div className={`investor-card investor-card--${status}`}>
      <div
        className="investor-card__avatar"
        style={{ background: investor.avatarColor }}
      >
        {initials}
      </div>
      <div className="investor-card__info">
        <span className="investor-card__name">{investor.name}</span>
        <span className="investor-card__style">{investor.style}</span>
      </div>
      <span className={`investor-card__status investor-card__status--${status}`}>
        {STATUS_LABELS[status]}
      </span>
    </div>
  )
}

export default InvestorCard

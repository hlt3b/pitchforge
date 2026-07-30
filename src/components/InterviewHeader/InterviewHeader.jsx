import './InterviewHeader.css'

function InterviewHeader({ investor, isFinished }) {
  const initials = investor.name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <div className="interview-header">
      <div
        className="interview-header__avatar"
        style={{ background: investor.avatarColor }}
      >
        {initials}
      </div>
      <div className="interview-header__info">
        <span className="interview-header__name">{investor.name}</span>
        <span className="interview-header__style">{investor.style}</span>
      </div>
      {isFinished && (
        <span className="interview-header__badge">Interview Complete</span>
      )}
    </div>
  )
}

export default InterviewHeader

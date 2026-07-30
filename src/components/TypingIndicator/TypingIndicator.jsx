import './TypingIndicator.css'

function TypingIndicator({ investor }) {
  const initials = investor.name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <div className="chat-bubble-row chat-bubble-row--investor">
      <div
        className="chat-bubble__avatar"
        style={{ background: investor.avatarColor }}
      >
        {initials}
      </div>
      <div className="typing-indicator">
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

export default TypingIndicator

import './ChatBubble.css'

function ChatBubble({ sender, text, investor }) {
  const isInvestor = sender === 'investor'
  const initials = investor
    ? investor.name
        .split(' ')
        .map((part) => part[0])
        .join('')
    : ''

  return (
    <div className={`chat-bubble-row chat-bubble-row--${sender}`}>
      {isInvestor && (
        <div
          className="chat-bubble__avatar"
          style={{ background: investor.avatarColor }}
        >
          {initials}
        </div>
      )}
      <div className={`chat-bubble chat-bubble--${sender}`}>
        {isInvestor && <span className="chat-bubble__author">{investor.name}</span>}
        <p className="chat-bubble__text">{text}</p>
      </div>
    </div>
  )
}

export default ChatBubble

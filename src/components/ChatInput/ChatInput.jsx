import './ChatInput.css'

function ChatInput({ value, onChange, onSend, disabled, placeholder }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      onSend()
    }
  }

  return (
    <div className="chat-input">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        aria-label="Message"
      />
      <button
        type="button"
        className="chat-input__send"
        onClick={onSend}
        disabled={disabled || !value.trim()}
      >
        Send
      </button>
    </div>
  )
}

export default ChatInput

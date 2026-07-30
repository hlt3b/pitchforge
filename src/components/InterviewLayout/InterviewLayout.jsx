import './InterviewLayout.css'

function InterviewLayout({ sidebar, children }) {
  return (
    <div className="interview-layout container">
      {sidebar}
      <div className="interview-layout__main">{children}</div>
    </div>
  )
}

export default InterviewLayout

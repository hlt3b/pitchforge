import { INVESTORS } from '../../data/investors'
import InvestorCard from '../InvestorCard/InvestorCard'
import './InvestorSidebar.css'

function InvestorSidebar({ currentInvestorIndex, isFinished }) {
  const getStatus = (index) => {
    if (isFinished || index < currentInvestorIndex) return 'finished'
    if (index === currentInvestorIndex) return 'interviewing'
    return 'waiting'
  }

  return (
    <aside className="investor-sidebar">
      <h2 className="investor-sidebar__title">Your Investors</h2>
      <div className="investor-sidebar__list">
        {INVESTORS.map((investor, index) => (
          <InvestorCard
            key={investor.id}
            investor={investor}
            status={getStatus(index)}
          />
        ))}
      </div>
    </aside>
  )
}

export default InvestorSidebar

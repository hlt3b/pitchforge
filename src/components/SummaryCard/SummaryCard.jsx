import './SummaryCard.css'

function SummaryCard({ title, items }) {
  return (
    <div className="summary-card">
      <h2 className="summary-card__title">{title}</h2>
      <dl className="summary-card__list">
        {items.map((item) => (
          <div className="summary-card__row" key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value || '—'}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default SummaryCard

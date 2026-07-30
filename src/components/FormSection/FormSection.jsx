import './FormSection.css'

function FormSection({ title, description, children }) {
  return (
    <div className="form-section">
      <div className="form-section__header">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      <div className="form-section__fields">{children}</div>
    </div>
  )
}

export default FormSection

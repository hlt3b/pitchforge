import './FormField.css'

function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required,
  placeholder,
  options,
}) {
  const inputId = `field-${name}`

  return (
    <div className={`form-field ${error ? 'form-field--error' : ''}`}>
      <label htmlFor={inputId} className="form-field__label">
        {label}
        {required && <span className="form-field__required">*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
        />
      ) : type === 'select' ? (
        <select id={inputId} name={name} value={value} onChange={onChange}>
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={inputId}
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}

      {error && <span className="form-field__error-text">{error}</span>}
    </div>
  )
}

export default FormField

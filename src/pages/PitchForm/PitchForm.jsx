import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../../components/FormField/FormField'
import FormSection from '../../components/FormSection/FormSection'
import usePitchStore from '../../store/usePitchStore'
import './PitchForm.css'

const FIELD_CONFIG = {
  companyName: {
    label: 'Company Name',
    type: 'text',
    placeholder: 'e.g. Nimbus Robotics',
    required: true,
  },
  industry: {
    label: 'Industry',
    type: 'select',
    required: true,
    options: [
      'SaaS',
      'Fintech',
      'Healthtech',
      'E-commerce',
      'AI / ML',
      'Consumer',
      'Hardware',
      'Other',
    ],
  },
  problem: {
    label: 'Problem',
    type: 'textarea',
    placeholder: 'What problem are you solving?',
    required: true,
  },
  solution: {
    label: 'Solution',
    type: 'textarea',
    placeholder: 'How does your product solve it?',
    required: true,
  },
  targetCustomer: {
    label: 'Target Customer',
    type: 'text',
    placeholder: 'Who is your ideal customer?',
    required: true,
  },
  businessModel: {
    label: 'Business Model',
    type: 'textarea',
    placeholder: 'How do you make money?',
    required: true,
  },
  currentRevenue: {
    label: 'Current Revenue',
    type: 'text',
    placeholder: 'e.g. $10,000/mo or Pre-revenue',
    required: true,
  },
  monthlyGrowthRate: {
    label: 'Monthly Growth Rate',
    type: 'text',
    placeholder: 'e.g. 15%',
    required: true,
  },
  valuation: {
    label: 'Valuation',
    type: 'text',
    placeholder: 'e.g. $2,000,000',
    required: true,
  },
  investmentAmount: {
    label: 'Investment Amount Requested',
    type: 'text',
    placeholder: 'e.g. $250,000',
    required: true,
  },
  equityOffered: {
    label: 'Equity Offered',
    type: 'text',
    placeholder: 'e.g. 10%',
    required: true,
  },
  founderStory: {
    label: 'Founder Story',
    type: 'textarea',
    placeholder: 'What inspired you to start this company?',
    required: true,
  },
}

const SECTIONS = [
  {
    title: 'Company Basics',
    description: "Tell us who you are and what space you're in.",
    fields: ['companyName', 'industry'],
  },
  {
    title: 'The Pitch',
    description: 'Explain the problem, your solution, and who it serves.',
    fields: ['problem', 'solution', 'targetCustomer', 'businessModel'],
  },
  {
    title: 'Financials',
    description: 'Give investors a snapshot of your numbers.',
    fields: [
      'currentRevenue',
      'monthlyGrowthRate',
      'valuation',
      'investmentAmount',
      'equityOffered',
    ],
  },
  {
    title: 'Founder Story',
    description: 'Share what drives you and your journey so far.',
    fields: ['founderStory'],
  },
]

function PitchForm() {
  const navigate = useNavigate()
  const storedPitch = usePitchStore((state) => state.pitch)
  const saveDraft = usePitchStore((state) => state.saveDraft)
  const submitPitch = usePitchStore((state) => state.submitPitch)

  const [formData, setFormData] = useState(storedPitch)
  const [errors, setErrors] = useState({})
  const [draftMessage, setDraftMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const validate = () => {
    const nextErrors = {}
    Object.entries(FIELD_CONFIG).forEach(([key, config]) => {
      if (config.required && !String(formData[key] ?? '').trim()) {
        nextErrors[key] = `${config.label} is required.`
      }
    })
    return nextErrors
  }

  const handleSaveDraft = () => {
    saveDraft(formData)
    setDraftMessage('Draft saved.')
    window.setTimeout(() => setDraftMessage(''), 3000)
  }

  const handleStartPitch = () => {
    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    submitPitch(formData)
    navigate('/investor-interview')
  }

  return (
    <section className="pitch-form">
      <div className="container">
        <div className="pitch-form__header">
          <h1>Submit Your Pitch</h1>
          <p>
            Fill out your startup details before meeting your AI investor
            panel.
          </p>
        </div>

        <form
          className="pitch-form__sections"
          onSubmit={(event) => event.preventDefault()}
          noValidate
        >
          {SECTIONS.map((section) => (
            <FormSection
              key={section.title}
              title={section.title}
              description={section.description}
            >
              {section.fields.map((fieldKey) => (
                <FormField
                  key={fieldKey}
                  name={fieldKey}
                  value={formData[fieldKey]}
                  onChange={handleChange}
                  error={errors[fieldKey]}
                  {...FIELD_CONFIG[fieldKey]}
                />
              ))}
            </FormSection>
          ))}

          <div className="pitch-form__actions">
            {draftMessage && (
              <span className="pitch-form__draft-message">
                {draftMessage}
              </span>
            )}
            <div className="pitch-form__buttons">
              <button
                type="button"
                className="btn btn--secondary"
                onClick={handleSaveDraft}
              >
                Save Draft
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={handleStartPitch}
              >
                Start Pitch
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default PitchForm

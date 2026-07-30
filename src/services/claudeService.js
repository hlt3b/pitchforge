const INVESTOR_CHAT_ENDPOINT = '/.netlify/functions/investor-chat'

async function callInvestorChat(payload) {
  const response = await fetch(INVESTOR_CHAT_ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    throw new Error(errorBody.error || `Investor chat request failed (${response.status})`)
  }

  return response.json()
}

export function getInvestorIntro({ investorId, pitch }) {
  return callInvestorChat({ investorId, pitch, history: [], mode: 'intro' })
}

export function getInvestorQuestion({ investorId, pitch, history, questionNumber }) {
  return callInvestorChat({ investorId, pitch, history, mode: 'question', questionNumber })
}

export function getInvestorDecision({ investorId, pitch, history }) {
  return callInvestorChat({ investorId, pitch, history, mode: 'decision' })
}

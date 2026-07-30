import { INVESTORS } from '../../src/data/investors.js'

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'
const ANTHROPIC_VERSION = '2023-06-01'
const MODEL = process.env.CLAUDE_MODEL || 'claude-sonnet-5'

const DECISION_TOOL = {
  name: 'record_decision',
  description:
    "Record this investor's final funding decision after the interview questions are complete.",
  input_schema: {
    type: 'object',
    properties: {
      outcome: {
        type: 'string',
        enum: ['Deal', 'Counter Offer', 'No Deal'],
        description: 'The investor\'s final decision.',
      },
      investmentAmount: {
        type: ['number', 'null'],
        description: 'Dollar amount offered. Null if outcome is "No Deal".',
      },
      equityRequested: {
        type: ['number', 'null'],
        description: 'Equity percentage requested. Null if outcome is "No Deal".',
      },
      reasoning: {
        type: 'string',
        description: '2-4 sentence in-character explanation for the decision.',
      },
      confidenceScore: {
        type: 'number',
        description: 'Confidence in this decision, from 0 to 100.',
      },
    },
    required: ['outcome', 'reasoning', 'confidenceScore'],
  },
}

function formatPitch(pitch) {
  return Object.entries(pitch || {})
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')
}

function formatHistory(history) {
  if (!history || history.length === 0) return '(no conversation yet)'
  return history
    .map((message) => `${message.sender === 'investor' ? 'You' : 'Founder'}: ${message.text}`)
    .join('\n')
}

function buildInstruction(mode, questionNumber) {
  if (mode === 'intro') {
    return 'Introduce yourself to the founder in 1-3 sentences, in character, referencing their company by name. Do not ask a question yet.'
  }
  if (mode === 'question') {
    return `Ask your question number ${questionNumber} of 3. Keep it natural and in character, building on the conversation so far if relevant. Ask exactly one question.`
  }
  if (mode === 'decision') {
    return 'The interview is complete. Based on the pitch and the full conversation, decide whether to make a Deal, a Counter Offer, or No Deal. Call the record_decision tool with your structured decision.'
  }
  return null
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server is missing ANTHROPIC_API_KEY' }),
    }
  }

  let payload
  try {
    payload = JSON.parse(event.body || '{}')
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) }
  }

  const { investorId, pitch, history, mode, questionNumber } = payload
  const investor = INVESTORS.find((inv) => inv.id === investorId)
  if (!investor) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Unknown investorId' }) }
  }

  const instruction = buildInstruction(mode, questionNumber)
  if (!instruction) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid mode' }) }
  }

  const userContent = `FOUNDER'S PITCH:\n${formatPitch(pitch)}\n\nCONVERSATION SO FAR WITH YOU:\n${formatHistory(
    history,
  )}\n\nINSTRUCTION:\n${instruction}`

  const requestBody = {
    model: MODEL,
    max_tokens: mode === 'decision' ? 600 : 300,
    system: investor.systemPrompt,
    messages: [{ role: 'user', content: userContent }],
  }

  if (mode === 'decision') {
    requestBody.tools = [DECISION_TOOL]
    requestBody.tool_choice = { type: 'tool', name: 'record_decision' }
  }

  let response
  try {
    response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': ANTHROPIC_VERSION,
      },
      body: JSON.stringify(requestBody),
    })
  } catch {
    return { statusCode: 502, body: JSON.stringify({ error: 'Failed to reach Claude API' }) }
  }

  if (!response.ok) {
    const details = await response.text()
    return {
      statusCode: response.status,
      body: JSON.stringify({ error: 'Claude API error', details }),
    }
  }

  const data = await response.json()

  if (mode === 'decision') {
    const toolUse = data.content.find((block) => block.type === 'tool_use')
    if (!toolUse) {
      return {
        statusCode: 502,
        body: JSON.stringify({ error: 'Claude did not return a structured decision' }),
      }
    }
    return { statusCode: 200, body: JSON.stringify({ type: 'decision', decision: toolUse.input }) }
  }

  const textBlock = data.content.find((block) => block.type === 'text')
  return {
    statusCode: 200,
    body: JSON.stringify({ type: 'message', message: textBlock ? textBlock.text : '' }),
  }
}

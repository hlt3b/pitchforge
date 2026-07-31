import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { INVESTORS, TOTAL_QUESTIONS_PER_INVESTOR } from '../data/investors'
import {
  getInvestorIntro,
  getInvestorQuestion,
  getInvestorDecision,
} from '../services/claudeService'

const createMessageId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `msg-${Date.now()}-${Math.random().toString(16).slice(2)}`

function formatDecisionText(decision) {
  const lines = [`Decision: ${decision.outcome}`]
  if (decision.outcome !== 'No Deal') {
    if (decision.investmentAmount != null) {
      lines.push(`Investment Amount: $${Number(decision.investmentAmount).toLocaleString()}`)
    }
    if (decision.equityRequested != null) {
      lines.push(`Equity Requested: ${decision.equityRequested}%`)
    }
  }
  lines.push(`Reasoning: ${decision.reasoning}`)
  lines.push(`Confidence Score: ${decision.confidenceScore}/100`)
  return lines.join('\n')
}

const useInterviewStore = create(
  persist(
    (set, get) => ({
      messages: [],
      currentInvestorIndex: 0,
      currentStep: 0, // 0 = intro, 1-3 = question number
      phase: 'intro', // 'intro' | 'question' | 'decision'
      isTyping: false,
      isFinished: false,
      decisions: {},
      error: null,

      // Fetches and appends whatever the current investor should say next
      // (their intro, their next question, or their final decision).
      requestInvestorTurn: async (pitch) => {
        const { phase } = get()
        if (phase === 'decision') {
          return get().requestDecision(pitch)
        }

        const { currentInvestorIndex, currentStep, messages } = get()
        const investor = INVESTORS[currentInvestorIndex]
        const history = messages.filter((message) => message.investorId === investor.id)

        set({ isTyping: true, error: null })
        try {
          const response =
            phase === 'intro'
              ? await getInvestorIntro({ investorId: investor.id, pitch })
              : await getInvestorQuestion({
                  investorId: investor.id,
                  pitch,
                  history,
                  questionNumber: currentStep,
                })

          set((state) => ({
            messages: [
              ...state.messages,
              {
                id: createMessageId(),
                sender: 'investor',
                investorId: investor.id,
                text: response.message,
              },
            ],
            isTyping: false,
          }))
        } catch (err) {
          set({ isTyping: false, error: err.message })
        }
      },

      requestDecision: async (pitch) => {
        const { currentInvestorIndex, messages } = get()
        const investor = INVESTORS[currentInvestorIndex]
        const history = messages.filter((message) => message.investorId === investor.id)

        set({ isTyping: true, error: null })
        try {
          const response = await getInvestorDecision({ investorId: investor.id, pitch, history })
          const isLastInvestor = currentInvestorIndex === INVESTORS.length - 1

          set((state) => ({
            messages: [
              ...state.messages,
              {
                id: createMessageId(),
                sender: 'investor',
                investorId: investor.id,
                text: formatDecisionText(response.decision),
              },
            ],
            decisions: { ...state.decisions, [investor.id]: response.decision },
            isTyping: false,
            isFinished: isLastInvestor,
            currentInvestorIndex: isLastInvestor ? currentInvestorIndex : currentInvestorIndex + 1,
            currentStep: 0,
            phase: 'intro',
          }))
        } catch (err) {
          set({ isTyping: false, error: err.message })
        }
      },

      submitAnswer: (text) => {
        const { currentInvestorIndex, currentStep } = get()
        const investor = INVESTORS[currentInvestorIndex]

        set((state) => ({
          messages: [
            ...state.messages,
            { id: createMessageId(), sender: 'founder', investorId: investor.id, text },
          ],
        }))

        if (currentStep < TOTAL_QUESTIONS_PER_INVESTOR) {
          set({ currentStep: currentStep + 1, phase: 'question' })
        } else {
          set({ phase: 'decision' })
        }
      },

      reset: () =>
        set({
          messages: [],
          currentInvestorIndex: 0,
          currentStep: 0,
          phase: 'intro',
          isTyping: false,
          isFinished: false,
          decisions: {},
          error: null,
        }),
    }),
    {
      name: 'pitchforge-interview',
      partialize: (state) => ({
        messages: state.messages,
        currentInvestorIndex: state.currentInvestorIndex,
        currentStep: state.currentStep,
        phase: state.phase,
        isFinished: state.isFinished,
        decisions: state.decisions,
      }),
    },
  ),
)

export default useInterviewStore

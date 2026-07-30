import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const EMPTY_PITCH = {
  companyName: '',
  industry: '',
  problem: '',
  solution: '',
  targetCustomer: '',
  businessModel: '',
  currentRevenue: '',
  monthlyGrowthRate: '',
  valuation: '',
  investmentAmount: '',
  equityOffered: '',
  founderStory: '',
}

const usePitchStore = create(
  persist(
    (set) => ({
      pitch: EMPTY_PITCH,
      isSubmitted: false,
      saveDraft: (data) => set({ pitch: data, isSubmitted: false }),
      submitPitch: (data) => set({ pitch: data, isSubmitted: true }),
      resetPitch: () => set({ pitch: EMPTY_PITCH, isSubmitted: false }),
    }),
    { name: 'pitchforge-pitch' },
  ),
)

export default usePitchStore

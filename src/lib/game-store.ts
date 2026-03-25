import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { CardType } from '@/lib/types'

export type GameState = {
  currentId: string | null
  spentCards: string[]
  settings: {
    randomAllPlay: boolean
  }
  turn: {
    history: string[]
    skippedId: string | null | 'Done'
    previousId: string | null
  }
}

const useGameStore = create(
  persist(
    () => {
      const state: GameState = {
        currentId: null,
        spentCards: [],
        settings: {
          randomAllPlay: false,
        },
        turn: {
          history: [],
          skippedId: null,
          previousId: null,
        },
      }

      return state
    },
    {
      name: 'game-state',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

const emptyTurn: GameState['turn'] = {
  history: [],
  skippedId: null,
  previousId: null,
}

const emptyGameState = (settings: GameState['settings']): GameState => {
  return {
    currentId: null,
    spentCards: [],
    settings,
    turn: emptyTurn,
  }
}

export const setNextCard = (currentId: string, cards: CardType[], skip?: boolean) => {
  useGameStore.setState((s) => {
    const spentCardSet = new Set([...s.spentCards])
    spentCardSet.add(currentId)

    const remainingCards = cards.filter((c) => !spentCardSet.has(c._id ?? '__'))
    const randomIndx = Math.floor(Math.random() * remainingCards.length)
    const randomId = remainingCards[randomIndx]._id

    if (spentCardSet.size + 2 >= cards.length) {
      const arr = Array.from(spentCardSet).slice(-10)
      return {
        ...s,
        currentId: randomId,
        spentCards: Array.from(arr),
        turn: {
          ...s.turn,
          history: s.currentId && !skip ? [...s.turn.history, s.currentId] : s.turn.history,
        },
      }
    }

    return {
      ...s,
      currentId: randomId,
      spentCards: Array.from(spentCardSet),
      turn: {
        ...s.turn,
        history: s.currentId && !skip ? [...s.turn.history, s.currentId] : s.turn.history,
      },
    }
  })
}

export const setNextTurn = () => {
  useGameStore.setState((s) => ({
    ...s,
    turn: emptyTurn,
  }))
}

export const setSkippedCard = (currentId: string) => {
  useGameStore.setState((s) => ({
    ...s,
    turn: {
      ...s.turn,
      skippedId: currentId,
    },
  }))
}

export const setCurrentId = (id: string) => {
  useGameStore.setState((s) => ({
    ...s,
    currentId: id,
    spentCards: [...s.spentCards, id],
  }))
}

export const setPreviousId = (id: string) => {
  useGameStore.setState((s) => ({
    ...s,
    turn: {
      ...s.turn,
      previousId: id,
    },
  }))
}

export const addTurnHistory = (id: string) => {
  useGameStore.setState((s) => ({
    ...s,
    turn: {
      ...s.turn,
      history: [...s.turn.history, id],
    },
  }))
}

export const useCurrentCardId = () => {
  return useGameStore((s) => s.currentId)
}

export const useCurrentSkippedCards = () => {
  return useGameStore((s) => s.turn.skippedId)
}

export const useCurrentHistory = () => {
  return useGameStore((s) => s.turn.history)
}

export const usePreviousId = () => {
  return useGameStore((s) => s.turn.previousId)
}

export const resetGameState = () => {
  return useGameStore.setState((s) => emptyGameState(s.settings))
}

export const useCurrentSettings = () => {
  return useGameStore((s) => s.settings)
}

export const setCurrentSettings = (settings: GameState['settings']) => {
  return useGameStore.setState((s) => ({
    ...s,
    settings,
  }))
}

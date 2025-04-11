import { useSyncExternalStore } from "react"

type Listener = () => void

function createStore<T>(initialState: T) {
  let state = initialState
  const listeners = new Set<Listener>()

  const getSnapshot = () => state
  const subscribe = (listener: Listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }
  const setState = (partial: Partial<T>) => {
    state = { ...state, ...partial }
    listeners.forEach(listener => listener())
  }

  const useStore = () => {
    return useSyncExternalStore(subscribe, getSnapshot)
  }

  return {
    useStore,
    setState,
    getState: getSnapshot,
  }
}

export default createStore
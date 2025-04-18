import { useSyncExternalStore } from "react";
import { useCallback } from "react";

/**
 * Type for store listener function
 */
type Listener = () => void;

/**
 * Type for store selector function
 */
type Selector<T, R> = (state: T) => R;

/**
 * Creates a simple store with React 18's useSyncExternalStore
 * @template T The store state type
 * @param initialState Initial state for the store
 * @returns Object with store methods
 */
function createStore<T>(initialState: T) {
  let state = initialState;
  const listeners = new Set<Listener>();

  /**
   * Gets the current state snapshot
   */
  const getSnapshot = () => state;

  /**
   * Subscribes to store changes
   * @param listener Function to call when state changes
   * @returns Unsubscribe function
   */
  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  /**
   * Updates the store state
   * @param partial Partial state to merge with current state
   */
  const setState = (partial: Partial<T>) => {
    // Create new state by merging current state with partial update
    const newState = { ...state, ...partial };

    // Update state and notify listeners
    state = newState;
    listeners.forEach((listener) => listener());
  };

  /**
   * Hook to use the store with optional selector for performance
   * @param selector Optional selector function to extract specific state
   * @returns Selected state or full state
   */
  const useStore = <R = T,>(selector?: Selector<T, R>): R | T => {
    // If selector is provided, use it to extract specific state
    if (selector) {
      // Create a memoized selector that only updates when selected value changes
      const memoizedSelector = useCallback(
        () => selector(getSnapshot()),
        [selector],
      );
      return useSyncExternalStore(
        subscribe,
        memoizedSelector,
        memoizedSelector,
      );
    }

    // Otherwise return the full state
    return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  };

  return {
    useStore,
    setState,
    getState: getSnapshot,
  };
}

export default createStore;

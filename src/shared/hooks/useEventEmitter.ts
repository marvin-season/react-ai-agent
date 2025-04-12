import { useCallback, useMemo } from "react";
import EventEmitter from "eventemitter3";

// Create a singleton event emitter instance
const eventEmitter = new EventEmitter();

/**
 * Type for event handler function
 */
type EventHandler<T = any> = (data: T) => void;

/**
 * Hook for working with the global event emitter
 * @returns Object with event emitter methods
 */
export const useEventEmitter = () => {
  /**
   * Emit an event with data
   */
  const emit = useCallback(<T>(event: string, data: T) => {
    eventEmitter.emit(event, data);
  }, []);

  /**
   * Subscribe to an event
   */
  const subscribe = useCallback(<T>(event: string, handler: EventHandler<T>) => {
    eventEmitter.on(event, handler);
  }, []);

  /**
   * Unsubscribe from an event
   */
  const unsubscribe = useCallback(<T>(event: string, handler: EventHandler<T>) => {
    eventEmitter.off(event, handler);
  }, []);

  return useMemo(() => ({
    emit,
    subscribe,
    unsubscribe,
    // Expose the raw emitter for advanced use cases
    emitter: eventEmitter,
  }), [emit, subscribe, unsubscribe]);
};

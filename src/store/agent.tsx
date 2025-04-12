import { ReactNode } from 'react';
import createStore from './createStore';

/**
 * Enum for UI message types
 */
export enum UIId {
  system,
  user,
  bot,
  tool,
}

/**
 * Interface for message properties
 */
export interface MessageProps {
  /** Unique identifier for the message */
  id: string;
  /** Content of the message */
  content: string;
  /** Type of UI to render for this message */
  uiId: UIId;
  /** Optional timestamp for the message */
  timestamp?: number;
}

/**
 * Interface for agent store state
 */
interface AgentProps {
  /** Array of messages */
  messages: MessageProps[];
}

/**
 * Map of UI components by type
 */
export const UIMap = new Map<UIId, ({ item }: { item: MessageProps }) => ReactNode>();

/**
 * Initial state for the agent store
 */
export const Agent: AgentProps = {
  messages: [
    {
      id: generateId(),
      content: 'hi, what can i do for you today?',
      uiId: UIId.system,
      timestamp: Date.now(),
    },
  ],
};

/**
 * Generate a unique ID for messages
 */
function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Create the store
const { useStore, setState, getState } = createStore<AgentProps>(Agent);

/**
 * Hook to access the agent store
 * @param selector Optional selector function
 * @returns Selected state or full state
 */
export const useAgentStore = useStore;

/**
 * Set the agent store state
 * @param state New state to set
 */
export const setAgentStore = setState;

/**
 * Get the current agent store state
 * @returns Current agent store state
 */
export const getAgentStore = getState;

/**
 * Selectors for common state access patterns
 */
export const selectors = {
  /**
   * Get all messages
   */
  messages: (state: AgentProps) => state.messages,

  /**
   * Get messages of a specific type
   */
  messagesByType: (state: AgentProps, type: UIId) =>
    state.messages.filter((message) => message.uiId === type),

  /**
   * Get the most recent message
   */
  latestMessage: (state: AgentProps) =>
    state.messages.length > 0
      ? state.messages[state.messages.length - 1]
      : null,
};

/**
 * Update a message in the store
 * @param message Message to update or add
 */
export const updateMessage = (message: MessageProps) => {
  const store = getAgentStore();
  let newMessages: MessageProps[] = [];
  const existedIndex = store.messages.findIndex((item) => item.id === message.id);

  if (existedIndex > -1) {
    // Update existing message
    newMessages = [
      ...store.messages.slice(0, existedIndex),
      {
        ...store.messages[existedIndex],
        content: store.messages[existedIndex].content + message.content,
        timestamp: Date.now(),
      },
      ...store.messages.slice(existedIndex + 1),
    ];
  } else {
    // Add new message
    newMessages = store.messages.concat({
      ...message,
      timestamp: message.timestamp || Date.now(),
    });
  }

  setAgentStore({
    messages: newMessages,
  });
};

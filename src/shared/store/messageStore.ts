import { MessageProps, UIId } from "../types/message";
import createStore from "./createStore";

/**
 * Interface for the message store state
 */
interface MessageStoreState {
  /** Array of messages */
  messages: MessageProps[];
}

/**
 * Initial state for the message store
 */
const initialState: MessageStoreState = {
  messages: [
    {
      id: generateId(),
      content: "Hi, what can I do for you today?",
      uiId: UIId.SYSTEM,
      timestamp: Date.now(),
    },
  ],
};

/**
 * Create the message store
 */
const { useStore, setState, getState } = createStore<MessageStoreState>(initialState);

/**
 * Generate a unique ID for messages
 * @returns A unique string ID
 */
function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Hook to access the message store
 * @param selector Optional selector function to extract specific state
 * @returns Selected state or full state
 */
export const useMessageStore = useStore;

/**
 * Get the current message store state
 * @returns Current message store state
 */
export const getMessageStore = getState;

/**
 * Set the message store state
 * @param state New state to set
 */
export const setMessageStore = setState;

/**
 * Add a new message to the store
 * @param message Message to add
 */
export const addMessage = (message: Omit<MessageProps, "timestamp">) => {
  const store = getMessageStore();
  setMessageStore({
    messages: [
      ...store.messages,
      {
        ...message,
        timestamp: Date.now(),
      },
    ],
  });
};

/**
 * Update an existing message in the store
 * @param message Message with ID to update
 */
export const updateMessage = (message: MessageProps) => {
  const store = getMessageStore();
  const existingIndex = store.messages.findIndex((item) => item.id === message.id);
  
  if (existingIndex > -1) {
    // Create a new array with the updated message
    const newMessages = [...store.messages];
    newMessages[existingIndex] = {
      ...store.messages[existingIndex],
      content: store.messages[existingIndex].content + message.content,
      timestamp: Date.now(),
    };
    
    setMessageStore({
      messages: newMessages,
    });
  } else {
    // If message doesn't exist, add it
    addMessage(message);
  }
};

/**
 * Clear all messages from the store
 */
export const clearMessages = () => {
  setMessageStore({
    messages: [],
  });
};

/**
 * Remove a specific message by ID
 * @param id ID of the message to remove
 */
export const removeMessage = (id: string) => {
  const store = getMessageStore();
  setMessageStore({
    messages: store.messages.filter((message) => message.id !== id),
  });
};

/**
 * Selectors for common state access patterns
 */
export const selectors = {
  /**
   * Get all messages
   */
  messages: (state: MessageStoreState) => state.messages,
  
  /**
   * Get messages of a specific type
   */
  messagesByType: (state: MessageStoreState, type: UIId) => 
    state.messages.filter((message) => message.uiId === type),
    
  /**
   * Get the most recent message
   */
  latestMessage: (state: MessageStoreState) => 
    state.messages.length > 0 
      ? state.messages[state.messages.length - 1] 
      : null,
};

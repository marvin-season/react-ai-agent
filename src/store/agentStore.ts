import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

/**
 * Enum for UI message types
 */
export enum UIId {
  system,
  user,
  bot,
  tool,
  computer,
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
  title?: string;
}

/**
 * Interface for agent store state
 */
interface AgentState {
  /** Array of messages */
  messages: MessageProps[];
  
  /** Actions */
  updateMessage: (message: MessageProps) => void;
  
  /** Selectors */
  getMessagesByType: (type: UIId) => MessageProps[];
  getLatestMessage: () => MessageProps | null;
}

/**
 * Create the agent store with Zustand
 */
export const useAgentStore = create<AgentState>()(
  immer((set, get) => ({
    // Initial state
    messages: [],
    
    // Actions
    updateMessage: (message: MessageProps) => {
      set((state) => {
        const existedIndex = state.messages.findIndex((item) => item.id === message.id);
        
        if (existedIndex > -1) {
          // Update existing message
          state.messages[existedIndex] = {
            ...state.messages[existedIndex],
            content: state.messages[existedIndex].content + message.content,
            timestamp: Date.now(),
          };
        } else {
          // Add new message
          state.messages.push({
            ...message,
            timestamp: message.timestamp || Date.now(),
          });
        }
      });
    },
    
    // Selectors
    getMessagesByType: (type: UIId) => {
      return get().messages.filter((message) => message.uiId === type);
    },
    
    getLatestMessage: () => {
      const { messages } = get();
      return messages.length > 0 ? messages[messages.length - 1] : null;
    },
  }))
);

/**
 * Generate a unique ID for messages
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

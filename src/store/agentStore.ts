import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

/**
 * Enum for UI message types
 */
export enum MessageType {
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
  type: MessageType;
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
  initializeMessages: (messages: MessageProps[]) => void;
  
  /** Selectors */
  getMessagesByType: (type: MessageType) => MessageProps[];
  getLatestMessage: () => MessageProps | null;
}

/**
 * Create the agent store with Zustand
 */
export const useAgentStore = create<AgentState>()(
  devtools(immer((set, get) => ({
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
    
    initializeMessages: (messages: MessageProps[]) => {
      set((state) => {
        state.messages = messages;
      });
    },

    // Selectors
    getMessagesByType: (type: MessageType) => {
      return get().messages.filter((message) => message.type === type);
    },
    
    getLatestMessage: () => {
      const { messages } = get();
      return messages.length > 0 ? messages[messages.length - 1] : null;
    },
  })), { name: 'agentStore' })
);

/**
 * Generate a unique ID for messages
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

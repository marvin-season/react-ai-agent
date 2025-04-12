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
 * Interface for tool event data
 */
export interface ToolEventData {
  /** ID of the message to update */
  id: string;
  /** String content to append */
  str: string;
}

import React, { ReactNode } from "react";
import { MessageProps, UIId } from "@/store/agentStore";
import { SystemMessage, UserMessage, BotMessage, ToolMessage, ComputerMessage } from "@/components/messages";

/**
 * Type for message component renderer
 */
type MessageRenderer = React.FC<{ item: MessageProps }>;

/**
 * Registry of message renderers by UI type
 */
class MessageRegistry {
  private registry = new Map<UIId, MessageRenderer>();

  /**
   * Register a message renderer for a UI type
   * @param uiId UI type identifier
   * @param renderer Component to render this message type
   */
  register(uiId: UIId, renderer: MessageRenderer): void {
    this.registry.set(uiId, renderer);
  }

  /**
   * Get a message renderer for a UI type
   * @param uiId UI type identifier
   * @returns The registered renderer or undefined if not found
   */
  getRenderer(uiId: UIId): MessageRenderer | undefined {
    return this.registry.get(uiId);
  }

  /**
   * Render a message with the appropriate component
   * @param message Message to render
   * @returns Rendered component or null if no renderer found
   */
  renderMessage(message: MessageProps): ReactNode {
    const Renderer = this.getRenderer(message.uiId);
    if (!Renderer) return null;

    return <Renderer key={message.id} item={message} />;
  }

  /**
   * Initialize the registry with default renderers
   */
  initializeDefaults(): void {
    this.register(UIId.system, SystemMessage);
    this.register(UIId.user, UserMessage);
    this.register(UIId.bot, BotMessage);
    this.register(UIId.tool, ToolMessage);
    this.register(UIId.computer, ComputerMessage);
  }
}

// Create and export a singleton instance
export const messageRegistry = new MessageRegistry();

// Initialize with default renderers
messageRegistry.initializeDefaults();

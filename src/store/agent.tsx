export enum UIId {
  system,
}

export const UIMap = new Map<UIId, (item: MessageProps) => ReactNode>()
UIMap.set(UIId.system, (item) => {
  return (
    <div>
      <span>{item.id}</span>
      <span>{item.content}</span>
    </div>
  )
})

interface MessageProps {
  content: string
  id: string
  uiId: UIId
}
interface AgentProps {
  messages: MessageProps[]
}

export const Agent: AgentProps = {
  messages: [
    {
      id: 'system1',
      content: 'hi, what can i do for you today?',
      uiId: UIId.system,
    },
  ],
}

export const UIStore = {}

import { ReactNode } from 'react'
import createStore from './createStore'

const { useStore, setState, getState } = createStore<AgentProps>(Agent)

export const useAgentStore = () => useStore()
export const setAgentStore = (Agent: AgentProps) => setState(Agent)
export const getAgentStore = () => getState()

export const updateMessage = (message: MessageProps) => {
  const store = getAgentStore()
  let newMessages: MessageProps[] = []
  const existedIndex = store.messages.findIndex((item) => item.id === message.id)
  if (existedIndex > -1) {
    newMessages = [
      ...store.messages.slice(0, existedIndex),
      {
        ...store.messages[existedIndex],
        content: store.messages[existedIndex].content + message.content,
      },
    ]
  } else {
    newMessages = store.messages.concat(message)
  }
  setAgentStore({
    messages: newMessages,
  })
}

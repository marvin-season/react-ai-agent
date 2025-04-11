export enum UIId {
  system,
  user,
  bot,
}

export const UIMap = new Map<UIId, (item: MessageProps) => ReactNode>()
UIMap.set(UIId.system, (item) => {
  return (
    <div className='bg-gray-300 rounded-md p-2 flex gap-2'>
      <span className='bg-white px-2 py-1 rounded-xl text-sm'>{'system'}</span>
      <span className='bg-blue-500 text-white px-2 py-1 rounded-xl text-sm'>{item.id}</span>
      <span className='bg-green-400 text-white px-2 py-1 rounded-xl text-sm'>{item.content}</span>
    </div>
  )
})
UIMap.set(UIId.user, (item) => {
  return (
    <div className='bg-gray-200 rounded-md p-2 flex gap-2'>
      <span className='bg-white px-2 py-1 rounded-xl text-sm'>{'user'}</span>
      <span className='bg-blue-400 text-white px-2 py-1 rounded-xl text-sm'>{item.id}</span>
      <span className='bg-green-400 text-white px-2 py-1 rounded-xl text-sm'>{item.content}</span>
    </div>
  )
})

UIMap.set(UIId.bot, (item) => {
  return (
    <div className='bg-gray-100 rounded-md p-2 flex gap-2'>
      <span className='bg-white px-2 py-1 rounded-xl text-sm'>{'bot'}</span>
      <span className='bg-blue-300 text-white px-2 py-1 rounded-xl text-sm'>{item.id}</span>
      <span className='bg-green-500 text-white px-2 py-1 rounded-xl text-sm'>{item.content}</span>
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
      id: Math.random().toString().slice(2),
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
      ...store.messages.slice(existedIndex + 1),
    ]
  } else {
    newMessages = store.messages.concat(message)
  }
  console.log(newMessages)
  setAgentStore({
    messages: newMessages,
  })
}

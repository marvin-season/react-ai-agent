export enum UIId {
  system,
}

interface MessageProps {
  content: string
  uiId: UIId
}
interface AgentProps {
  messages: MessageProps[]
}

export const Agent: AgentProps = {
  messages: [
    {
      content: 'hi, what can i do for you today?',
      uiId: UIId.system,
    },
  ],
}

export const UIStore = {}

import createStore from './createStore'

const { useStore, setState, getState } = createStore<AgentProps>(Agent)

export const useAgentStore = () => useStore()
export const setAgentStore = (Agent: AgentProps) => setState(Agent)
export const getAgentStore = () => getState()

export const pushMessage = (message: MessageProps) => {
  const store = getAgentStore()
  setAgentStore({
    messages: store.messages.concat(message),
  })
}

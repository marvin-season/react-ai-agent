import { pushMessage, UIId, useAgentStore } from '@/store/agent'

export const Index = () => {
  const store = useAgentStore()
  return (
    <>
      <div
        onClick={() => {
          pushMessage({ content: 'hello', uiId: UIId.system })
        }}
      >
        ADD
      </div>
      {store.messages.map((item) => item.content)}
    </>
  )
}

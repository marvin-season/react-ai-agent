import { updateMessage, UIId, UIMap, useAgentStore } from '@/store/agent'

export const Index = () => {
  const store = useAgentStore()
  return (
    <>
      <div
        onClick={() => {
          updateMessage({ content: 'hello', uiId: UIId.system, id: 'user1' })
        }}
      >
        ADD
      </div>
      {store.messages.map((item) => {
        const render = UIMap.get(item.uiId)
        if (!render) return null
        return render(item)
      })}
    </>
  )
}

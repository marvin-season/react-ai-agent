import { updateMessage, UIId, UIMap, useAgentStore } from '@/store/agent'

export const Index = () => {
  const store = useAgentStore()
  return (
    <>
      <div
        onClick={() => {
          updateMessage({ content: 'hello', uiId: UIId.user, id: Math.random().toString().slice(2) })
        }}
      >
        push
      </div>
      <div
        onClick={() => {
          updateMessage({ content: 'hello', uiId: UIId.user, id: '27392189038218309'})
        }}
      >
        update
      </div>
      {store.messages.map((item) => {
        const render = UIMap.get(item.uiId)
        if (!render) return null
        return render(item)
      })}
    </>
  )
}

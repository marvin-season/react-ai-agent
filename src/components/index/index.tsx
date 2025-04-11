import { updateMessage, UIId, UIMap, useAgentStore } from '@/store/agent'

export const Index = () => {
  const store = useAgentStore()
  return (
    <>
      <div
        onClick={() => {
          updateMessage({ content: ' System Tips: click the btn!', uiId: UIId.system, id: Math.random().toString().slice(2) })
        }}
      >
        push(system)
      </div>
      <div
        onClick={() => {
          updateMessage({ content: 'hello, can i help you?', uiId: UIId.user, id: Math.random().toString().slice(2) })
        }}
      >
        push(user)
      </div>
      <div
        onClick={() => {
          updateMessage({ content: 'hello', uiId: UIId.bot, id: '27392189038218309' })
        }}
      >
        update(bot)
      </div>
      {store.messages.map((item) => {
        const render = UIMap.get(item.uiId)
        if (!render) return null
        return render(item)
      })}
    </>
  )
}

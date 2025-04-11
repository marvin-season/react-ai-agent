import { updateMessage, UIId, UIMap, useAgentStore } from '@/store/agent'
import { EE, initUI } from '@/utils/ui-register'
initUI()
export const Index = () => {
  const store = useAgentStore()
  return (
    <>
      <div className="flex gap-2 p-4">
        <button
          className="cursor-pointer bg-white border px-2 py-1 rounded hover:bg-slate-200"
          onClick={() => {
            updateMessage({ content: ' System Tips: click the btn!', uiId: UIId.system, id: Math.random().toString().slice(2) })
          }}
        >
          push(system)
        </button>
        <button
          className="cursor-pointer bg-white border px-2 py-1 rounded hover:bg-slate-200"
          onClick={() => {
            updateMessage({ content: 'hello, can i help you?', uiId: UIId.user, id: Math.random().toString().slice(2) })
          }}
        >
          push(user)
        </button>
        <button
          className="cursor-pointer bg-white border px-2 py-1 rounded hover:bg-slate-200"
          onClick={() => {
            updateMessage({ content: 'hello', uiId: UIId.bot, id: '27392189038218309' })
          }}
        >
          update(bot)
        </button>
        <button
          className="cursor-pointer bg-white border px-2 py-1 rounded hover:bg-slate-200"
          onClick={() => {
            const id = Math.random().toString().slice(2)
            updateMessage({
              content: '',
              uiId: UIId.tool,
              id,
            })
            setInterval(() => {
              EE.emit('tool', {
                id,
                str: 'hi',
              })
            }, 10)
          }}
        >
          tool
        </button>
      </div>
      {store.messages.map((item) => {
        const UI = UIMap.get(item.uiId)
        if (!UI) return null
        return <UI key={item.id} item={item} />
      })}
    </>
  )
}

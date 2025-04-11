import { UIId, UIMap } from '@/store/agent'

export function initUI() {
  UIMap.set(UIId.system, (item) => {
    return (
      <div className="bg-gray-300 rounded-md p-2 flex gap-2">
        <span className="bg-white px-2 py-1 rounded-xl text-sm">{'system'}</span>
        <span className="bg-blue-500 text-white px-2 py-1 rounded-xl text-sm">{item.id}</span>
        <span className="bg-green-400 text-white px-2 py-1 rounded-xl text-sm">{item.content}</span>
      </div>
    )
  })
  UIMap.set(UIId.user, (item) => {
    return (
      <div className="bg-gray-200 rounded-md p-2 flex gap-2">
        <span className="bg-white px-2 py-1 rounded-xl text-sm">{'user'}</span>
        <span className="bg-blue-400 text-white px-2 py-1 rounded-xl text-sm">{item.id}</span>
        <span className="bg-green-400 text-white px-2 py-1 rounded-xl text-sm">{item.content}</span>
      </div>
    )
  })

  UIMap.set(UIId.bot, (item) => {
    return (
      <div className="bg-gray-100 rounded-md p-2 flex gap-2">
        <span className="bg-white px-2 py-1 rounded-xl text-sm">{'bot'}</span>
        <span className="bg-blue-300 text-white px-2 py-1 rounded-xl text-sm">{item.id}</span>
        <span className="bg-green-500 text-white px-2 py-1 rounded-xl text-sm">{item.content}</span>
      </div>
    )
  })
}

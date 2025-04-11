import { MessageProps, UIId, UIMap } from '@/store/agent'
import { EventEmitter } from 'eventemitter3'
import { useEffect, useState } from 'react'

export const EE = new EventEmitter()

export function initUI() {
  UIMap.set(UIId.system, SystemUI)
  UIMap.set(UIId.user, UserUI)
  UIMap.set(UIId.bot, BotUI)
  UIMap.set(UIId.tool, ToolUI)
}

export const SystemUI = ({ item }: { item: MessageProps }) => {
  return (
    <div className="bg-gray-300 rounded-md p-2 flex gap-2">
      <span className="bg-white px-2 py-1 rounded-xl text-sm">{'system'}</span>
      <span className="bg-blue-500 text-white px-2 py-1 rounded-xl text-sm">{item.id}</span>
      <span className="bg-green-400 text-white px-2 py-1 rounded-xl text-sm">{item.content}</span>
    </div>
  )
}

export const UserUI = ({ item }: { item: MessageProps }) => {
  return (
    <div className="bg-gray-200 rounded-md p-2 flex gap-2">
      <span className="bg-white px-2 py-1 rounded-xl text-sm">{'user'}</span>
      <span className="bg-blue-400 text-white px-2 py-1 rounded-xl text-sm">{item.id}</span>
      <span className="bg-green-400 text-white px-2 py-1 rounded-xl text-sm">{item.content}</span>
    </div>
  )
}

export const BotUI = ({ item }: { item: MessageProps }) => {

  return (
    <div className="bg-gray-100 rounded-md p-2 flex gap-2">
      <span className="bg-white px-2 py-1 rounded-xl text-sm">{'bot'}</span>
      <span className="bg-blue-300 text-white px-2 py-1 rounded-xl text-sm">{item.id}</span>
      <span className="bg-green-500 text-white px-2 py-1 rounded-xl text-sm">{item.content}</span>
    </div>
  )
}

export const ToolUI = ({ item }: { item: MessageProps }) => {
  const [content, setContent] = useState(item.content || '')
  
  useEffect(() => {
    const handler = (data: { id: string; str: string }) => {
      if (data.id === item.id) {
        setContent(prev => prev + data.str)
      }
    }
    
    EE.on('tool', handler)
    
    return () => {
      EE.off('tool', handler)
    }
  }, [item.id])

  return (
    <div className="bg-gray-100 rounded-md p-2 flex flex-col gap-2">
      <div className="flex gap-2">
        <span className="bg-white px-2 py-1 rounded-xl text-sm">{'tool'}</span>
        <span className="bg-blue-300 text-white px-2 py-1 rounded-xl text-sm">{item.id}</span>
      </div>
      <div className="bg-green-500 text-white px-2 py-1 rounded-xl text-sm">{content}</div>
    </div>
  )
}
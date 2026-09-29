import React from 'react'
import {ScrollArea} from "./ui/scroll-area"

const TodoList = ({ news }) => {
  const normalizedNews = Array.isArray(news) ? news : [];
  const items = normalizedNews.length > 0
    ? normalizedNews.map((item, index) => ({
        id: item?.id || index + 1,
        title: item?.title || item?.description || 'Community update',
        body: item?.content || item?.body || 'No additional details.',
      }))
    : [{ id: 1, title: 'No updates yet', body: 'The latest community news will appear here.' }];

  return (
    <div>
      <h1 className='text-lg font-medium'>Latest updates</h1>
      <ScrollArea className='max-h-[400px] mt-4 overflow-y-auto'>
        <div className='space-y-3'>
          {items.map((item) => (
            <div key={item.id} className='rounded-md border p-3'>
              <p className='font-medium'>{item.title}</p>
              <p className='text-sm text-muted-foreground'>{item.body}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default TodoList
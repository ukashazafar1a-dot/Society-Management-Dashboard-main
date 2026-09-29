'use client'

import React from 'react'
import { Card, CardContent, CardFooter, CardTitle } from './ui/card'

type CartItem = {
  id: number;
  title: string;
  badge?: string;
  count?: number;
};

const popularContent = [
  { id: 1, title: "JavaScript", badge: "Coding", count: 4300 },
  { id: 2, title: "Python", badge: "Coding", count: 3800 },
  { id: 3, title: "ReactJS", badge: "Frontend", count: 3200 },
  { id: 4, title: "NextJS", badge: "Frontend", count: 2900 },
  { id: 5, title: "NodeJS", badge: "Backend", count: 2700 },
  { id: 6, title: "TypeScript", badge: "Coding", count: 2500 },
  { id: 7, title: "HTML & CSS", badge: "Frontend", count: 2300 },
  { id: 8, title: "TailwindCSS", badge: "Frontend", count: 2100 },
  { id: 9, title: "MongoDB", badge: "Database", count: 1900 },
  { id: 10, title: "GraphQL", badge: "API", count: 1700 },
]

const latestTransaction = [
  { id: 1, title: "Payment Received", badge: "Umer", count: 1200 },
  { id: 2, title: "Invoice Paid", badge: "Ali", count: 1000 },
  { id: 3, title: "Subscription Renewed", badge: "Sara", count: 900 },
  { id: 4, title: "Order Shipped", badge: "Ahmed", count: 850 },
  { id: 5, title: "Refund Issued", badge: "Zara", count: 800 },
  { id: 6, title: "Payment Failed", badge: "Omar", count: 750 },
  { id: 7, title: "New Order", badge: "Hassan", count: 700 },
  { id: 8, title: "Transfer Completed", badge: "Ayesha", count: 650 },
  { id: 9, title: "Invoice Generated", badge: "Usman", count: 600 },
  { id: 10, title: "Refund Requested", badge: "Nadia", count: 550 },
]

const CartList = ({ title, items }: { title: string; items?: CartItem[] }) => {
  const list = items && items.length > 0 ? items : title === "popularContent" ? popularContent : latestTransaction

  return (
    <div>
      <h1 className='text-lg font-medium mb-6'>{title}</h1>
      <div className='flex flex-col gap-4'>
        {list.slice(0,6).map(item => (
          <Card key={item.id} className="flex-row items-center justify-between p-4 gap-4">
            <CardContent>
              <CardTitle>{item.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{item.badge || 'Latest update'}</p>
            </CardContent>
            <CardFooter>{item.count ?? ''}</CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CartList
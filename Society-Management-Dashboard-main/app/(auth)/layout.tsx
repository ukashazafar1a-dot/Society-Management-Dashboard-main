import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md px-4 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
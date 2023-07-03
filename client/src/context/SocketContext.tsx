import React, { createContext, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

interface ISocketContextProps {
  children: React.ReactNode
}

const socket: Socket = io('http://localhost:5000')

export const SocketContext = createContext<Socket>(socket)

export const SocketProvider = ({ children }: ISocketContextProps) => {
  useEffect(() => {
    socket.disconnect()
    socket.connect()

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

import React, { createContext } from 'react'
import { io, Socket } from 'socket.io-client'

interface ISocketContextProps {
  children: React.ReactNode
}

// Socket.IO bağlantısını oluşturun
const socket: Socket = io('http://localhost:5000')

// Socket Context oluşturun
export const SocketContext = createContext<Socket>(socket)

// Socket Provider bileşeni
export const SocketProvider = ({ children }: ISocketContextProps) => {
  // Socket bağlantısını paylaşmak için bir kontekst sağlayın
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

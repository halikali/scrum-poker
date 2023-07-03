import React, { createContext, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

import appSettings from '../../appSettings.json'
import { IAppSettings } from '../types/commonTypes'

interface ISocketContextProps {
  children: React.ReactNode
}

const appSettingsTyped: IAppSettings = appSettings

const mode = import.meta.env.MODE
console.log("🚀 ~ file: SocketContext.tsx:14 ~ mode:", mode)


const socket: Socket = io(appSettingsTyped[mode].socketUrl)
console.log("🚀 ~ file: SocketContext.tsx:18 ~ appSettingsTyped[mode].socketUrl:", appSettingsTyped[mode].socketUrl)

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

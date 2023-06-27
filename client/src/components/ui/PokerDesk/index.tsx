import { FC, ReactNode } from 'react'
import './_pockerDesk.scss'

interface IPockerDeskProps {
  children: string | ReactNode
}

const PokerDesk: FC<IPockerDeskProps> = ({ children }) => {
  return <div className="pocker-desk">{children}</div>
}

export default PokerDesk

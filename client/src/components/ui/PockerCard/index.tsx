import { FC, ReactNode } from 'react'
import './_pockerCard.scss'

interface IPockerCardProps {
  children?: ReactNode
  owner?: string
  className?: string
}

const PockerCard: FC<IPockerCardProps> = ({ children, owner, className }) => {
  return (
    <div className={`pocker-card ${className}`}>
      {children}
      {owner && <span className="owner"> {owner} </span>}
    </div>
  )
}

export default PockerCard

import { FC, ReactNode } from 'react'
import './_pockerCard.scss'

interface IPockerCardProps {
  children?: ReactNode
  owner?: string
  className?: string | null
  onClickHandler?: () => void
}

const PockerCard: FC<IPockerCardProps> = ({
  children,
  owner,
  className,
  onClickHandler,
}) => {
  return (
    <div className={`pocker-card ${className}`} onClick={onClickHandler}>
      {children}
      {owner && <span className="owner"> {owner} </span>}
    </div>
  )
}

export default PockerCard

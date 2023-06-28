import React, { FC } from 'react'
import './_button.scss'

interface IButtonProps {
  children: React.ReactNode
  onClickHandler?: () => void
}

const Button: FC<IButtonProps> = ({ children, onClickHandler }) => {
  return (
    <button className="button" onClick={onClickHandler}>
      {children}
    </button>
  )
}

export default Button

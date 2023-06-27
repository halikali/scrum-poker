import React from 'react'
import './_button.scss'

interface IButtonProps {
  children: React.ReactNode
}

const Button = ({ children }: IButtonProps) => {
  return <button className="button">{children}</button>
}

export default Button

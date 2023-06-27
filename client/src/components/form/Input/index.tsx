import { FC } from 'react'
import './_input.scss'

interface IInputProps {
  placeholder: string
  type: string
}

const Input: FC<IInputProps> = ({ placeholder, type }) => {
  return <input className="input" type={type} placeholder={placeholder} />
}

export default Input

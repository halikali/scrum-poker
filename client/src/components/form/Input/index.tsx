import { FC } from 'react'
import './_input.scss'

interface IInputProps {
  placeholder: string
  type: string
  refs?: any
  readOnly?: boolean
}

const Input: FC<IInputProps> = ({ placeholder, type, refs, ...props }) => {
  return (
    <input
      className="input"
      type={type}
      placeholder={placeholder}
      ref={refs}
      {...props}
    />
  )
}

export default Input

import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/form/Button'
import Input from '../../components/form/Input'

import './login.scss'

const Login = () => {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>()

  const createGame = () => {
    if (!inputRef.current?.value.trim()) return
    const roomID = uuidv4()
    navigate(`/game/${roomID}`)
  }

  return (
    <div className="container login-page">
      <Input placeholder="Game's name" type="text" refs={inputRef} />
      <Button onClickHandler={createGame}>Create Game</Button>
    </div>
  )
}

export default Login

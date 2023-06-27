import Button from '../../components/form/Button'
import Input from '../../components/form/Input'

import './login.scss'

const Login = () => {
  return (
    <div className="container login-page">
      <Input placeholder="Game's name" type="text" />
      <Button>Create Game</Button>
    </div>
  )
}

export default Login

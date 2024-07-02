import React, {useState} from 'react'

const LandingForm = ({handleSubmit, formType}) => {
  // could extract to hook: setup state + return handlers
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const resetFields = () => {
    setUsername('')
    setPassword('')
  }

  const onSubmit = event => {
    event.preventDefault()
    // console.log({username, password})
    handleSubmit({username, password})
    resetFields()
  }

  let buttonText = 'Submit'

  if (formType === 'login') {
    buttonText = 'Login'
  } else if (formType === 'register') {
    buttonText = 'Register'
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
      </div>
      <button type="submit">{buttonText}</button>
    </form>
  )
}

export {LandingForm}

import React from 'react'
import {Logo} from './logo'
import {LoginButton} from './login-button'
import {RegisterButton} from './register-button'
import {LandingPageDialog} from './dialog'

const App = () => {
  // can extract state + handleToggle to generic hook that can be used to return
  // what's needed for Login or Register
  const [isLoginOpen, setIsLoginOpen] = React.useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = React.useState(false)

  const handleLoginToggle = () => setIsLoginOpen(!isLoginOpen)
  const handleRegisterToggle = () => setIsRegisterOpen(!isRegisterOpen)

  return (
    <>
      <h1>Bookshelfio</h1>
      <Logo width="80" height="80" />
      <div>
        <LoginButton handleLoginToggle={handleLoginToggle} />
      </div>
      <div>
        <RegisterButton handleRegisterToggle={handleRegisterToggle} />
      </div>
      {isLoginOpen && (
        <LandingPageDialog showDialog={true} handleToggle={handleLoginToggle} formType="login" />
      )}
      {isRegisterOpen && (
        <LandingPageDialog
          showDialog={true}
          handleToggle={handleRegisterToggle}
          formType="register"
        />
      )}
    </>
  )
}

export {App}

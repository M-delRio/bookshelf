/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import {client} from 'utils/api-client.exercise'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

function App() {
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    const getExistingUser = async () => {
      const userToken = await auth.getToken()

      if (!userToken) {
        return
      }

      try {
        // auth could also be refactored to simply accept token and headers arg
        const response = await client('me', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        })

        if (response.user) {
          setUser(response.user)
        }
      } catch (err) {
        console.log(`error: ${JSON.stringify(err)}`)
      }
    }
    getExistingUser()
  }, [])

  const writeTokenLocalStorage = token => {
    localStorage.setItem('__auth_provider_token__', token)
  }

  const login = async form => {
    try {
      const userResponse = await auth.login(form)
      writeTokenLocalStorage(userResponse.token)
      setUser(userResponse)

    } catch (err) {}
  }

  const register = async form => {
    try {
      const userResponse = await auth.register(form)
      setUser(userResponse)
      writeTokenLocalStorage(user.token)
    } catch (err) {}
  }

  const logout = async form => {
    try {
      await auth.logout()
      setUser(null)
    } catch (err) {}
  }

  return user ? (
    <AuthenticatedApp user={user} logout={logout} />
  ) : (
    <UnauthenticatedApp login={login} register={register} />
  )
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/

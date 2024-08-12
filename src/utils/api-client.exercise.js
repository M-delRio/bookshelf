import * as auth from 'auth-provider'

const apiURL = process.env.REACT_APP_API_URL

function client(endpoint, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig,
  }

  return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    const data = await response.json()
    if (response.status === 401) {
      await auth.logout()
      window.location.assign(window.location)
      throw new Error("401 logout")
    }

    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {client}

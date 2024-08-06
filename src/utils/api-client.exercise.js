async function client(endpoint, customConfig = {method: "GET"}) {
  const fullURL = `${process.env.REACT_APP_API_URL}/${endpoint}`

  const request = new Request(fullURL, {
    customConfig
  })

  try {
    const response = await fetch(request)

    const result = await response.json()
    console.log("Success:", result);
  } catch (error) {
    console.log("Error:", error);
  }
}

export {client}

/*






























💰 spoiler alert below...



























































const config = {
    method: 'GET',
    ...customConfig,
  }
*/

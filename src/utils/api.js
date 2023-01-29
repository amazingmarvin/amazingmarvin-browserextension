export async function verifyToken (token) {
  const res = await fetch("https://serv.amazingmarvin.com/api/test", {
    method: "POST",
    headers: {
      "X-API-Token": token,
    }
  })

  if (res.ok) {
    console.log("token is correct")

    return { xApiToken: token }
  }

  if (!res.ok) {
    // Check if user provided X-Full-Access-Token

    const res = await fetch("https://serv.amazingmarvin.com/api/test", {
      method: "POST",
      headers: {
        "X-Full-Access-Token": token,
      }
    })

    if (res.ok) {
      console.log("token is correct")

      return { xFullAccessToken: token }
    }
  }

  return false
}
import { formatDate } from "./dates";

export async function verifyToken(token) {
  const res = await fetch("https://serv.amazingmarvin.com/api/test", {
    method: "POST",
    headers: {
      "X-API-Token": token,
    },
  });

  if (res.ok) {
    return { "X-API-Token": token };
  }

  if (!res.ok) {
    // Check if user provided X-Full-Access-Token

    const res = await fetch("https://serv.amazingmarvin.com/api/test", {
      method: "POST",
      headers: {
        "X-Full-Access-Token": token,
      },
    });

    if (res.ok) {
      console.log("token is correct");

      return { "X-Full-Access-Token": token };
    }
  }

  return false;
}

export async function getTasks(token, day) {
  const fixedDay = formatDate(day);
  const res = await fetch(
    `https://serv.amazingmarvin.com/api/todayItems?date=${fixedDay}`,
    {
      method: "GET",
      headers: {
        ...token
      },
    }
  );

  if (res.ok) {
    return await res.json();
  }

  if (!res.ok) {
    console.log(res);
  }
}

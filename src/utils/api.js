import { formatDate } from "./dates";
import {
  getStoredToken,
  setLastSyncedCategories,
  setLastSyncedLabels,
  setStoredCategories,
  setStoredLabels,
} from "./storage";

export function testAPI(token) {
  return fetch("https://serv.amazingmarvin.com/api/test", {
    method: "POST",
    headers: {
      ...token
    },
  });
}

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
        ...token,
      },
    }
  );

  if (res.ok) {
    return { ok: res.ok, status: res.status, tasks: await res.json() };
  }

  if (!res.ok) {
    return { ok: res.ok, status: res.status, tasks: [] };
  }
}

// Needed to add "host_permissions": ["https://serv.amazingmarvin.com/api/*"], to Manifest in order for markDone to work
// https://stackoverflow.com/questions/64732755/access-to-fetch-has-been-blocked-by-cors-policy-chrome-extension-error

export async function markDone(token, id) {
  const timeZoneOffset = new Date().getTimezoneOffset();
  const data = {
    itemId: id,
    timeZoneOffset,
  };

  const res = await fetch(`https://serv.amazingmarvin.com/api/markDone`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...token,
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    return new Promise((resolve) => {
      resolve(id);
    });
  }

  if (!res.ok) {
    console.log(res);
  }
}

// Fetches categories from API and stores them in local storage. Returns a promise.
export async function getCategories() {
  let token = await getStoredToken().then((token) => token);

  const res = await fetch(`https://serv.amazingmarvin.com/api/categories`, {
    method: "GET",
    headers: {
      ...token,
    },
  });

  if (res.ok) {
    let categories = await res.json();
    await setLastSyncedCategories();
    return setStoredCategories(categories);
  }

  if (!res.ok) {
    console.log(res);
  }
}

export async function getLabels() {
  let token = await getStoredToken().then((token) => token);

  const res = await fetch(`https://serv.amazingmarvin.com/api/labels`, {
    method: "GET",
    headers: {
      ...token,
    },
  });

  if (res.ok) {
    let labels = await res.json();
    await setLastSyncedLabels();
    return setStoredLabels(labels);
  }

  if (!res.ok) {
    console.log(res);
  }
}

export async function addTask(data) {
  let token = await getStoredToken().then((token) => token);
  data.timeZoneOffset = new Date().getTimezoneOffset();

  const res = await fetch(`https://serv.amazingmarvin.com/api/addTask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...token,
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    return new Promise((resolve) => {
      resolve("success");
    });
  }

  if (!res.ok) {
    return new Promise((resolve) => {
      resolve("fail");
    });
  }
}

import { createSession, generateSessionToken, setSessionTokenCookie } from "$lib/oauth";
import { RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
  const code = event.url.searchParams.get("code");
  if (code === null) {
    return new Response(null, {
      status: 400
    })
  }
  let token = await getToken(code);
  let user = await getUser(token);
  const sessionToken = generateSessionToken();
  const session = await createSession(token, user.id);
  setSessionTokenCookie(event, sessionToken, session.expiresAt);
  return new Response(null, {
    status: 302,
    headers: {
      'Location': '/'
    }
  })
}

async function getUser(token: string): Promise<User> {
  const req = await fetch(process.env.USER_INFO_URL, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const res = (await req.json());
  console.log(res);
  let user: User = {
    id: res.data.cid,
    firstName: res.data.personal.name_first,
    lastName: res.data.personal.name_last,
    rating: res.data.vatsim.rating,
    email: res.data.personal.email,
    division: res.data.vatsim.division,
    facility: ""
  }

  if (user.division === "USA") {
    //User is in VATUSA
    const vatusaReq = await fetch(`https://api.vatusa.net/v2/user/${user.id}?apikey=${process.env.VATUSA_KEY}`, {
      method: 'GET'
    })
    const vatusaRes = await vatusaReq.json();
    console.log(vatusaRes);
    user.facility = vatusaRes.artcc;
  }
  return user;
}

async function getToken(code: string): Promise<string> {
  let formBody = [];
  let body = {
    "grant_type": "authorization_code",
    "client_id": process.env.CONNECT_ID,
    "client_secret": process.env.CONNECT_SECRET,
    "code": code,
  }

  for (let property in body) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  let finalFormBody = formBody.join("&");

  const req = await fetch(process.env.TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    mode: 'no-cors',
    body: finalFormBody
  })
  const res = await req.json();
  return res.access_token;
}

type User = {
  id: number,
  firstName: string,
  lastName: string,
  rating: number,
  email: string,
  division: string,
  facility: string
}
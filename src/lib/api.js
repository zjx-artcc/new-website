//@ts-nocheck

class Api {
  async GET(endpoint) {
    const url = `http://zjx.svalencia.me/${endpoint}`;
    console.log(url);
    const res = await fetch(url);
    if (res.status == 404) {
      return 404;
    }
    return res.json();
  }
  async POST(endpoint) {
    const url = `http://zjx.svalencia.me/${endpoint}`;
    console.log(url);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return res.json();
  }
}

export const api = new Api();


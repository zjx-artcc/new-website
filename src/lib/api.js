//@ts-nocheck
class Api {
  constructor(url) {
    this.baseUrl = url;
  }
  async GET(endpoint) {
    const url = this.baseUrl + endpoint;
    console.log(url);
    const res = await fetch(url);
    if (res.status == 404) {
      return 404;
    }
    return res.json();
  }
  async POST(endpoint) {
    const url = this.baseUrl + endpoint;
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

let api = undefined;
if (process.env.NODE_ENV == 'PRODUCTION') {
  api = new Api('https://zjx.svalencia.me/');
} else {
  api = new Api('http://localhost:4500/');
}

export { api };


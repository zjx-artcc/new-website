//@ts-nocheck
class Api {
  constructor(url) {
    this.baseUrl = url;
  }
  async GET(endpoint) {
    const url = this.baseUrl + endpoint;
    const res = await fetch(url);
    if (res.status == 404) {
      return 404;
    }
    return res.json();
  }
  async POST(endpoint, data) {
    const url = this.baseUrl + endpoint;
    console.log(url, JSON.stringify(data));
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return res.json();
  }
}

let api = new Api('http://zjx.svalencia.me/');

export { api };


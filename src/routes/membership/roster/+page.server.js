//@ts-nocheck

import { api } from '$lib/api';

/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params, cookies }) {
  let pageData = {
    loggedIn: false,
    home: [],
    visiting: [],
  }
  if (cookies.get("session")) {
    pageData.loggedIn = true;
  }
  const data = await api.GET('controllers/all');
  for(let i = 0; i < data.length; i++) {
    let flagged = false;
    if (data[i].del_certs == undefined) {
      console.log(data[i]);
      flagged = true;
    }
    data[i].del_certs = getCerts(data[i].del_certs)
    data[i].gnd_certs = getCerts(data[i].gnd_certs)
    data[i].twr_certs = getCerts(data[i].twr_certs)
    data[i].app_certs = getCerts(data[i].app_certs)
    data[i].ctr_cert = getCenterCert(data[i].ctr_cert)

    if (flagged) {
      console.log(data[i])
    }

    if (data[i].home_facility == "ZJX") {
      pageData.home.push(data[i])
    } else {
      pageData.visiting.push(data[i])
    }
  }
  return {
    pageData
  }
}

function getCerts(input) {
  switch(input) {
    case 'Uncertified': {
      return {
        cert: input,
        color: "#868E96"
      }
    }
    case 'Tier 1 (MCO) Certified': {
      return {
        cert: input,
        color: "#9ccc65"
      }
    }
    case "Tier 1 (MCO) Solo Certified": {
      return {
        cert: input,
        color: "#ffca28"
      }
    }
    case 'Tier 2 (JAX/PNS) Certified': {
      return {
        cert: input,
        color: "#42a5f5"
      }
    }
    case 2.5: {
      return {
        cert: "Tier 2 Solo",
        color: "#ffca28"
      }
    }
  }
}

function getCenterCert(input) {
  switch(input) {
    case 'Certified': {
      return {
        cert: input,
        color: "#9ccc65"
      }
    }
    case 'Uncertified': {
      return {
        cert: input,
        color: "#868E96"
      }
    }
    case 'Solo Certified': {
      return {
        cert: input,
        color: "#ffca28"
      }
    }
  }
}
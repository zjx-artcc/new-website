//@ts-nocheck

import { api } from '$lib/api';

/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params }) {
  let pageData = {
    home: [],
    visiting: [],
  }
  const data = await api.GET('controllers/all');
  for(let i = 0; i < data.length; i++) {
    console.log(data[i]);
    data[i].del_certs = getCerts(data[i].del_certs)
    data[i].gnd_certs = getCerts(data[i].gnd_certs)
    data[i].twr_certs = getCerts(data[i].twr_certs)
    data[i].app_certs = getCerts(data[i].app_certs)
    data[i].ctr_cert = getCenterCert(data[i].ctr_cert)

    if (data[i].home_facility == "ZJX") {
      pageData.home.push(data[i])
    } else {
      pageData.visiting.push(data[i])
    }
  }
  console.log(pageData);
  return {
    pageData
  }
}

function getCerts(input) {
  switch(input) {
    case 0: {
      return {
        cert: "Not Certified",
        color: "#868E96"
      }
    }
    case 1: {
      return {
        cert: "Tier 1 Certified",
        color: "#9ccc65"
      }
    }
    case 1.5: {
      return {
        cert: "Tier 1 Solo",
        color: "#ffca28"
      }
    }
    case 2: {
      return {
        cert: "Tier 2 Certified",
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
    case 1: {
      return {
        cert: "Certified",
        color: "#9ccc65"
      }
    }
    case 0: {
      return {
        cert: "Not Certified",
        color: "#868E96"
      }
    }
    case 2: {
      return {
        cert: "Solo",
        color: "#ffca28"
      }
    }
  }
}
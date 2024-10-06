//@ts-nocheck
import { prisma, getCerts, getCtrCerts, getRating } from '$lib/db';

/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params, cookies, locals }) {
  let pageData = {
    loggedIn: false,
    home: [],
    visiting: [],
  }
  if (locals.getSession().user) {
    pageData.loggedIn = true;
  }
  const data = await prisma.roster.findMany({
    orderBy: {
      last_name: 'asc'
    }
  })
  for(let i = 0; i < data.length; i++) {
    let flagged = false;
    if (data[i].del_certs == undefined) {
      console.log(data[i]);
      flagged = true;
    }
    data[i].del_certs = getCertsColor(data[i].del_certs)
    data[i].gnd_certs = getCertsColor(data[i].gnd_certs)
    data[i].twr_certs = getCertsColor(data[i].twr_certs)
    data[i].app_certs = getCertsColor(data[i].app_certs)
    data[i].ctr_cert = getCtrCertColor(parseInt(data[i].ctr_cert))
    data[i].rating = getRating(parseInt(data[i].rating))

    console.log(data[i]);

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

function getCertsColor(input: number): {cert: number, color: string} {
  console.log(input);
  switch(input) {
    case 0: {
      return {
        cert: getCerts(input),
        color: "#868E96"
      }
    }
    case 1: {
      return {
        cert: getCerts(input),
        color: "#9ccc65"
      }
    }
    case 1.5: {
      return {
        cert: getCerts(input),
        color: "#ffca28"
      }
    }
    case 2: {
      return {
        cert: getCerts(input),
        color: "#42a5f5"
      }
    }
    case 2.5: {
      return {
        cert: getCerts(input),
        color: "#ffca28"
      }
    }
    case 3: {
      return {
        cert: getCerts(input),
        color: "#ffc800"
      }
    }
  }
}

function getCtrCertColor(input: number): {cert: number, color: string} {
  switch(input) {
    case 1: {
      return {
        cert: getCtrCerts(input),
        color: "#9ccc65"
      }
    }
    case 0: {
      return {
        cert: getCtrCerts(input),
        color: "#868E96"
      }
    }
    case 1.5: {
      return {
        cert: getCtrCerts(input),
        color: "#ffca28"
      }
    }
  }
}
//@ts-nocheck

import { supabase } from '../../../lib/supabaseClient';

/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params }) {
  let pageData = {
    home: [],
    visiting: [],
  }
  const { data, error } = await supabase.from("roster").select("*").order('first_name', { ascending: true })
  if (error) {
    console.error(error);
    return;
  }
  for(let i = 0; i < data.length; i++) {
    switch(data[i].rating) {
      case 1:
          data[i].rating = "OBS"
          break;
      case 2:
        data[i].rating = "S1"
        break;
      case 3:
        data[i].rating = "S2"
        break;
      case 4:
        data[i].rating = "S3"
        break;
      case 5:
        data[i].rating = "C1"
        break;
      case 7:
        data[i].rating = "C3"
        break;
      case 8:
        data[i].rating = "I1"
        break;
      case 10:
        data[i].rating = "I3"
        break;
      case 11:
        data[i].rating = "SUP"
        break;
      case 12:
        data[i].rating = "ADM"
        break;
    }

    console.log(data[i]);
    data[i].del_cert = getCerts(data[i].del_cert)
    data[i].gnd_cert = getCerts(data[i].gnd_cert)
    data[i].twr_cert = getCerts(data[i].twr_cert)
    data[i].app_cert = getCerts(data[i].app_cert)
    data[i].ctr_cert = getCenterCert(data[i].ctr_cert)

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
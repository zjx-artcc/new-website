import { prisma } from "$lib/db";

import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async () => {
  let pageData = new PageData();
  let staff = await prisma.staffRole.findMany({
    orderBy: {
      role: 'asc'
    }
  });
  for (let i = 0; i < staff.length; i++) {
    if (staff[i].role == "FACCBT" || staff[i].role == "WT") {
      continue;
    }
    let controller = await prisma.roster.findFirst({
      where: {
        cid: staff[i].cid
      },
      select: {
        firstName: true,
        lastName: true,
      }
    })

    let staffMember: Staff = {
      cid: staff[i].cid,
      name: `${controller.firstName} ${controller.lastName}`,
      role: staff[i].role,
      email: `${controller.firstName}.${controller.lastName}@zjxartcc.org`.toLowerCase()
    }
    
    switch (staff[i].role) {
      case "ATM": pageData.atm = staffMember; break;
      case "DATM": pageData.datm = staffMember; break;
      case "TA": pageData.ta = staffMember; break;
      case "FE": pageData.fe = staffMember; break;
      case "EC": pageData.ec = staffMember; break;
      case "WM": pageData.wm = staffMember; break;
      case "ATA": pageData.ata.push(staffMember); break;
      case "AFE": pageData.afe.push(staffMember); break;
      case "AEC": pageData.aec.push(staffMember); break;
      case "AWM": pageData.awm.push(staffMember); break;
      case "INS": pageData.ins.push(staffMember); break;
      case "MTR": pageData.mtr.push(staffMember); break;
    }

  }

  if (pageData.atm == undefined) {
    pageData.atm = {
      cid: 0,
      name: "Vacant",
      role: "ATM",
      email: ""
    }
  }
  if (pageData.datm == undefined) {
    pageData.datm = {
      cid: 0,
      name: "Vacant",
      role: "DATM",
      email: "atm@zjxartcc.org"
    }
  }
  if (pageData.ta == undefined) {
    pageData.ta = {
      cid: 0,
      name: "Vacant",
      role: "TA",
      email: "atm@zjxartcc.org"
    }
  }
  if (pageData.fe == undefined) {
    pageData.fe = {
      cid: 0,
      name: "Vacant",
      role: "FE",
      email: "atm@zjxartcc.org"
    }
  }


  return { pageData: {...pageData }};
}

class PageData {
  atm: Staff;
  datm: Staff;
  ta: Staff;
  fe: Staff;
  ec: Staff;
  wm: Staff;
  ata: Staff[];
  afe: Staff[];
  aec: Staff[];
  awm: Staff[];
  ins: Staff[];
  mtr: Staff[];

  constructor() {
    this.atm = undefined;
    this.datm = undefined;
    this.ta = undefined;
    this.fe = undefined;
    this.ec = undefined;
    this.wm = undefined;
    this.ata = [];
    this.afe = [];
    this.aec = [];
    this.awm = [];
    this.ins = [];
    this.mtr = [];
  }
}

type Staff = {
  cid: number;
  name: string;
  role: string;
  email: string;
}
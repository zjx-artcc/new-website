import { getStaffRoles, prisma } from "$lib/db";

import type { File } from "@prisma/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  let pageData = new PageData();

  if (locals.session) {
    pageData.canEdit = await getStaffRoles(locals.session.userId, "files");
  }

  const files = await prisma.file.findMany();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.type === "sop") {
      pageData.sops.push(file);
    } else if (file.type === "loa") {
      pageData.loas.push(file);
    } else if (file.type === "vatis") {
      pageData.vATIS.push(file);
    }else if (file.type === "misc"){
      pageData.misc.push(file);
    }
  }

  return {pageData: {...pageData}};
}

class PageData {
  canEdit: boolean;
  sops: File[];
  loas: File[];
  vATIS: File[];
  misc: File[];

  constructor() {
    this.canEdit = false;
    this.sops = [];
    this.loas = [];
    this.vATIS = [];
    this.misc = [];
  }
}
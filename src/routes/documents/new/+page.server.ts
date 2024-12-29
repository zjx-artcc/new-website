import { fail, redirect } from "@sveltejs/kit";
import { getStaffRoles } from "$lib/db";
import { writeFileSync } from "fs";
import { prisma } from '$lib/db';

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.session) {
    redirect(302, '/login');
  }

  if (!await getStaffRoles(locals.session.userId, 'files')) {
    redirect(302, '/documents');
  }
}

export const actions: Actions = {
  default: async ({ request, locals }) => {
    if (!locals.session) {
      return {
        status: 401,
        body: {
          message: 'Unauthorized, please login'
        }
      }
    }

    if (!await getStaffRoles(locals.session.userId, 'files')) {
      return {
        status: 403,
        body: {
          message: 'Forbidden, nice try!'
        }
      }
    }

    const formData = await request.formData();
    const file: File = formData.get('file') as File;
    const type = formData.get('type').toString().toUpperCase();
    const description = formData.get('desc').toString();

    if (!file.name || file.name === "undefined") {
      return fail(400, {
        error: true,
        message: 'You must provide a file to upload'
      });
    }



    writeFileSync(`documents/${type.toLowerCase()}/${file.name}`, Buffer.from(await file.arrayBuffer()));

    await prisma.file.create({
      data: {
        name: file.name,
        updated: new Date(),
        description: description,
        path: `documents/${type.toLowerCase()}/${file.name}`,
        type: type
      }
    })

    redirect(302, '/documents');
  }
}
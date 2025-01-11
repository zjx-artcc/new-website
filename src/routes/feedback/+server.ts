import { prisma, getStaffRoles } from '$lib/db';
import { json } from '@sveltejs/kit';

export async function POST({ request, locals }): Promise<Response> {
  if (!locals.session) {
    return json({ success: false, error: 'Unauthorized' });
  }

  if (!await getStaffRoles(locals.session.userId, 'admin')) {
    return json({ success: false, error: 'Unauthorized' });
  }

  let { id } = await request.json();

  let feedback = await prisma.feedback.update({
    where: {
      id: id
    },
    data: {
      public: true
    }
  })

  if (!feedback) {
    return json({ success: false, error: 'Feedback not found' });
  }

  return json({ success: true });
}

export async function DELETE({ request, locals }): Promise<Response> {
  if (!locals.session) {
    return json({ success: false, error: 'Unauthorized' });
  }

  if (!await getStaffRoles(locals.session.userId, 'admin')) {
    return json({ success: false, error: 'Unauthorized' });
  }

  let { id, reason } = await request.json();

  let feedback = await prisma.feedback.delete({
    where: {
      id: id
    }
  })

  await prisma.action.create({
    data: {
      user: locals.session.userId,
      action: `${locals.user.firstName} ${locals.user.lastName} deleted feedback for ${feedback.controller} with reason: ${reason}`
    }
  })

  if (!feedback) {
    return json({ success: false, error: 'Feedback not found' });
  }

  return json({ success: true });
}
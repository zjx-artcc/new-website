import type { Feedback } from "@prisma/client";
import type { PageServerLoad } from "./$types";
import { getStaffRoles, prisma } from "$lib/db";

export const load: PageServerLoad = async ({ locals }) => {
  let pageData = new PageData();
  let feedback = await prisma.feedback.findMany({
    where: {
      public: true
    },
    orderBy: {
      created: "desc"
    }
  })

  for (let i = 0; i < feedback.length; i++) {
    let feedbackItem = feedback[i];
    let controller = await prisma.roster.findUnique({
      where: {
        cid: feedbackItem.controller
      },
      select: {
        firstName: true,
        lastName: true 
      }
    })
    let author = await prisma.user.findUnique({
      where: {
        id: feedbackItem.author
      },
      select: {
        firstName: true,
        lastName: true
      }
    })
    pageData.feedback.push({
      id: feedbackItem.id,
      author: `${author.firstName} ${author.lastName}`,
      rating: feedbackItem.rating,
      controller: `${controller.firstName} ${controller.lastName}`,
      position: feedbackItem.position,
      comment: feedbackItem.comment,
      created: feedbackItem.created
    })
  }

  
  if (locals.session) {
    if (await getStaffRoles(locals.session.userId, "admin")) {
      pageData.staff = true;
      let hidden = await prisma.feedback.findMany({
        where: {
          public: false
        },
        orderBy: {
          created: "asc"
        }
      })

      for (let i = 0; i < hidden.length; i++) {
        let feedbackItem = hidden[i];
        let controller = await prisma.roster.findUnique({
          where: {
            cid: feedbackItem.controller
          },
          select: {
            firstName: true,
            lastName: true 
          }
        })
        let author = await prisma.user.findFirst({
          where: {
            id: feedbackItem.author
          },
          select: {
            firstName: true,
            lastName: true
          }
        })
        pageData.hidden.push({
          id: feedbackItem.id,
          author: `${author.firstName} ${author.lastName}`,
          rating: feedbackItem.rating,
          controller: `${controller.firstName} ${controller.lastName}`,
          position: feedbackItem.position,
          comment: feedbackItem.comment,
          created: feedbackItem.created
        })
      }
    }
  }

  return { pageData: {...pageData}}
}

class PageData {
  feedback: WebFeedback[];
  hidden: WebFeedback[];
  staff: Boolean;

  constructor() {
    this.feedback = [];
    this.hidden = [];
    this.staff = false;
  }
}

export type WebFeedback = {
  id: string;
  author: string;
  rating: number;
  controller: string;
  position: string;
  comment: string;
  created: Date
}
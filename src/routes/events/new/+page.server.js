//@ts-nocheck
export const prerender = false;

/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params, cookies }) {
  let pageData = {
    loggedIn: false,
    staffInteger: 0,
    cid: 0
  }
  if (cookies.get("session")) {
    pageData.loggedIn = true;
    pageData.staffInteger = parseInt(cookies.get("si"));
    pageData.cid = parseInt(cookies.get("cid"));
  }

  return pageData;
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async({ request, cookies }) => {
    const formData = await request.formData();
    let positions = formData.getAll("positions");
    let controllers = formData.getAll("controllers");
    console.log(positions);
    let event = {
      last_modified: Date.now(),
      created_by: cookies.get("cid"),
      name: formData.get("name"),
      description: formData.get("description"),
      event_start: formData.get("start"),
      event_end: formData.get("end"),
      host: formData.get("host"),
      hidden: formData.get("hidden") == "on" ? true : false,
      banner: formData.get("banner"),
      positions: []
    }
    if (Array.isArray(positions)) {
      for (let i = 0; i < positions.length; i++) {
        event.positions.push({
          type: "",
          position: positions[i],
          controller: controllers[i] == null ? "" : controllers[i]
        })
      }
    } else {
      event.positions.push({
        type: "",
        position: positions,
        controller: controllers
      })
    }
    console.log(event);
  }
}
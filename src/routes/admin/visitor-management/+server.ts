/** @type {import('./$types').RequestHandler} */
export const POST = async ({request}): Promise<Response> => {
    // do stuff
    const {cid, actionMessage} = await request.json()
    console.log(cid)
    return new Response(
        JSON.stringify(cid),
        {
            status: 403
        }
    )
}
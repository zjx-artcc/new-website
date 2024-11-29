/** @type {import('./$types').RequestHandler} */
export const POST = async ({request}): Promise<Response> => {
    // do stuff
    const {cid, actionMessage} = await request.json()
    
    return new Response(
        JSON.stringify({"cid": cid}),
        {
            status: 200
        }
    )
}
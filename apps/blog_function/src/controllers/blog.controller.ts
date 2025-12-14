import { withAuth } from "../auth"
import { getBlogs } from "../services/blog.service"



export const getBlogsController = withAuth(async (request: Request, env: Env) => {
    const url = new URL(request.url)

    const limit = Math.min(Number(url.searchParams.get("limit") ?? "20"), 100)
    const offset = Math.max(Number(url.searchParams.get("offset") ?? "0"), 0)

    const publishedParam = url.searchParams.get("published")
    let published: boolean | undefined
    if(publishedParam === "true") published = true
    else if(publishedParam === "false") published = false

    const fromParam = url.searchParams.get("from")
    const toParam = url.searchParams.get("to")
    const from = fromParam ? new Date(fromParam) : undefined
    const to = toParam ? new Date(toParam) : undefined

    if((from&&isNaN(from.getTime())) || (to&&isNaN(to.getTime()))) {
        return new Response(
            JSON.stringify({ error: "invalid 'from' or 'to' date." }),
            { status: 400, headers: { "Content-Type": "application/json" } },
        )
    }
    if(to) to.setHours(23, 59, 59, 999)
    
    const { blogs, total } = await getBlogs(
        env.DB, { limit, offset, published, from, to }
    )
    return new Response(
        JSON.stringify({  ok: true, total, blogs, limit, offset, }),
        { status: 200, headers: { "Content-Type": "application/json" } },
    )
})
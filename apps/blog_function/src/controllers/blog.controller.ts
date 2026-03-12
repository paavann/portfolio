import { getPublishedBlogs, getPublishedBlogBySlug } from "../services/notion.service"
import { Handler } from "../types/handler"

const LIST_TTL = 60 * 10
const POST_TTL = 60 * 10

function jsonResponse(data: unknown, status = 200): Response {
    return new Response(JSON.stringify(data), {
        status, headers: { "Content-Type": "application/json" },
    })
}

function errorResponse(message: string, status: number): Response {
    return jsonResponse({ ok: false, error: message }, status)
}


//GET /api/blogs
export const getBlogsController: Handler = async (request, env) => {
    const url = new URL(request.url)
    const limit = Math.min(Math.max(Number(url.searchParams.get("limit") ?? "10"), 1), 50)
    const cursor = url.searchParams.get("cursor") ?? undefined

    const cacheKey = `blogs:list:${limit}:${cursor ?? "start"}`
    try {
        const cached = await env.KV.get(cacheKey)
        if (cached) {
            return jsonResponse({ ok: true, cached: true, ...JSON.parse(cached) })
        } else {
            const result = await getPublishedBlogs(env, limit, cursor)
            await env.KV.put(cacheKey, JSON.stringify(result), { expirationTtl: LIST_TTL })
            return jsonResponse({ ok: true, cached: false, ...result })
        }
    } catch (err) {
        console.error("getBlogsController error:", err)
        return errorResponse("failed to fetch blogs.", 500)
    }
}


//GET /api/blogs/:slug
export const getBlogBySlugController: Handler = async (request, env) => {
    const url = new URL(request.url)
    const slug = url.pathname.split("/").pop()

    if (!slug) {
        return errorResponse("slug is required.", 400)
    } else {
        const cacheKey = `blogs:post:${slug}`
        try {
            const cached = await env.KV.get(cacheKey)
            if (cached) {
                return jsonResponse({ ok: true, cached: true, blog: JSON.parse(cached) })
            } else {
                const blog = await getPublishedBlogBySlug(env, slug)
                if (!blog) {
                    return errorResponse("blog not found.", 404)
                } else {
                    await env.KV.put(cacheKey, JSON.stringify(blog), { expirationTtl: POST_TTL })
                    return jsonResponse({ ok: true, cached: false, blog })
                }
            }
        } catch (err) {
            console.error("getBlogBySlugController error:", err)
            return errorResponse("failed to fetch blog.", 500)
        }
    }
}
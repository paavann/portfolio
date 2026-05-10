import { getPublishedBlogs, getPublishedBlogBySlug } from "../services/notion.service"
import { jsonResponse, } from "../utils/res.utils"
import type { Handler } from "../types/handler.types"
import { NotionApiError } from "../utils/notion.utils"

const LIST_TTL = 60 * 10
const POST_TTL = 60 * 10



//GET /api/blogs
export const getBlogs: Handler = async (request, env) => {
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
        if (err instanceof NotionApiError) {
            const { status, message } = err
            return jsonResponse({ ok: false, error: message }, status)
        } else {
            const errMessage = err instanceof Error ? err.message : "failed to fetch blogs."
            return jsonResponse({ ok: false, error: errMessage, }, 500)
        }
    }
}



//GET /api/blogs/:slug
export const getBlogBySlug: Handler = async (request, env) => {
    const url = new URL(request.url)
    const slug = url.pathname.split("/").pop()

    if (!slug) {
        return jsonResponse({ ok: false, error: "slug is required.", }, 400)
    } else {
        const cacheKey = `blogs:post:${slug}`
        try {
            const cached = await env.KV.get(cacheKey)
            if (cached) {
                return jsonResponse({ ok: true, cached: true, blog: JSON.parse(cached) })
            } else {
                const blog = await getPublishedBlogBySlug(env, slug)
                if (!blog) {
                    return jsonResponse({ ok: false, error: "blog not found.", }, 404)
                } else {
                    await env.KV.put(cacheKey, JSON.stringify(blog), { expirationTtl: POST_TTL })
                    return jsonResponse({ ok: true, cached: false, blog })
                }
            }
        } catch (err) {
            console.error("getBlogBySlugController error:", err)
            if (err instanceof NotionApiError) {
                const { status, message } = err
                return jsonResponse({ ok: false, error: message }, status)
            } else {
                const errMessage = err instanceof Error ? err.message : "failed to fetch blog."
                return jsonResponse({ ok: false, error: errMessage, }, 500)
            }
        }
    }
}
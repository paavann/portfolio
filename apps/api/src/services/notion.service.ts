import type {
    BlogMeta, BlogPost,
    NotionBlock, NotionBlocksResponse, NotionQueryResponse,
} from "../types/notion.types"
import { transformPageToMeta, notionHeaders, NotionApiError } from "../utils/notion.utils"

const NOTION_BASE = "https://api.notion.com/v1"



const fetchAllBlocks = async (pageId: string, apiKey: string): Promise<NotionBlock[]> => {
    const blocks: NotionBlock[] = []
    let cursor: string | null = null

    do {
        const url = new URL(`${NOTION_BASE}/blocks/${pageId}/children`)
        url.searchParams.set("page_size", "100")
        if (cursor) url.searchParams.set("start_cursor", cursor)

        const res = await fetch(url.toString(), { headers: notionHeaders(apiKey), })
        if (!res.ok) {
            throw new Error(`notion blocks API error: ${res.status}`)
        } else {
            const data = await res.json() as NotionBlocksResponse
            blocks.push(...data.results)
            cursor = data.has_more ? data.next_cursor : null
        }
    } while (cursor)

    return blocks
}



export async function getPublishedBlogs(env: Env, limit: number, cursor?: string): Promise<{ blogs: BlogMeta[]; hasMore: boolean; nextCursor: string | null }> {
    const body: Record<string, unknown> = {
        filter: { property: "Status", select: { equals: "published", } },
        sorts: [{ property: "Published At", direction: "descending", }],
        page_size: limit,
    }
    if (cursor) body.start_cursor = cursor

    const res = await fetch(`${NOTION_BASE}/databases/${env.NOTION_BLOGS_DB_ID}/query`, {
        method: "POST",
        headers: notionHeaders(env.NOTION_API_KEY),
        body: JSON.stringify(body),
    })
    if (!res.ok) {
        const errBody = await res.json() as { message?: string, code?: string }
        throw new NotionApiError(
            res.status, errBody.message ?? res.statusText, errBody.code,
        )
    } else {
        const data = await res.json() as NotionQueryResponse
        const blogs = data.results.map(transformPageToMeta)
        return {
            blogs, hasMore: data.has_more, nextCursor: data.next_cursor,
        }
    }
}



export async function getPublishedBlogBySlug(env: Env, slug: string): Promise<BlogPost | null> {
    const res = await fetch(`${NOTION_BASE}/databases/${env.NOTION_BLOGS_DB_ID}/query`, {
        method: "POST",
        headers: notionHeaders(env.NOTION_API_KEY),
        body: JSON.stringify({
            filter: {
                and: [
                    { property: "Slug", rich_text: { equals: slug } },
                    { property: "Status", select: { equals: "published" } },
                ],
            },
            page_size: 1,
        }),
    })

    if (!res.ok) {
        const errBody = await res.json() as { message?: string, code?: string }
        throw new NotionApiError(
            res.status, errBody.message ?? res.statusText, errBody.code,
        )
    } else {
        const data = await res.json() as NotionQueryResponse
        if (data.results.length === 0) {
            return null
        } else {
            const page = data.results[0]
            const meta = transformPageToMeta(page)
            const blocks = await fetchAllBlocks(page.id, env.NOTION_API_KEY)
            return { ...meta, blocks }
        }
    }
}
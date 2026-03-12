import {
    BlogMeta, BlogPost,
    NotionBlock, NotionBlocksResponse, NotionPage, NotionPropertyValue, NotionQueryResponse,
} from "../types/notion.types"


const NOTION_VERSION = "2022-06-28"
const NOTION_BASE = "https://api.notion.com/v1"


function notionHeaders(apiKey: string): HeadersInit {
    return {
        "Authorization": `Bearer ${apiKey}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
    }
}


function extractText(prop: NotionPropertyValue | undefined): string {
    if (!prop) {
        return ""
    } else {
        switch (prop.type) {
            case "title":
                return prop.title.map(t => t.plainText).join("")
            case "rich_text":
                return prop.rich_text.map(r => r.plainText).join("")
            default:
                return ""
        }
    }
}


function extractSelect(prop: NotionPropertyValue | undefined): string | null {
    if (!prop || prop.type !== "select") {
        return null
    } else {
        return prop.select?.name ?? null
    }
}


function extractMultiSelect(prop: NotionPropertyValue | undefined): string[] {
    if (!prop || prop.type !== "multi_select") {
        return []
    } else {
        return prop.multi_select.map(o => o.name)
    }
}


function extractDate(prop: NotionPropertyValue | undefined): string | null {
    if (!prop || prop.type !== "date") {
        return null
    } else {
        return prop.date?.start ?? null
    }
}


function extractFile(prop: NotionPropertyValue | undefined): string | null {
    if (!prop || prop.type !== "files") {
        return null
    } else {
        const file = prop.files[0]
        if (!file) {
            return null
        } else if (file.type === "external") {
            return file.external?.url ?? null
        } else if (file.type === "file") {
            return file.file?.url ?? null
        } else {
            return null
        }
    }
}


export function transformPageToMeta(page: NotionPage): BlogMeta {
    const p = page.properties
    return {
        id: page.id,
        title: extractText(p["Title"]),
        slug: extractText(p["Slug"]),
        summary: extractText(p["Summary"]),
        tags: extractMultiSelect(p["Tags"]),
        publishedAt: extractDate(p["Published At"]),
        cover: extractFile(p["Cover"]),
    }
}


async function fetchAllBlocks(pageId: string, apiKey: string): Promise<NotionBlock[]> {
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
            cursor = data.hasMore ? data.nextCursor : null
        }
    } while (cursor)

    return blocks
}


export async function getPublishedBlogs(env: Env, limit: number, cursor?: string): Promise<{ blogs: BlogMeta[]; hasMore: boolean; nextCursor: string | null }> {
    const body: Record<string, unknown> = {
        filter: { property: "Status", select: { equals: "published", } },
        sorts: [{ property: "Pushlished At", direction: "descending", }],
        pageSize: limit,
    }
    if (cursor) body.startCursor = cursor

    const res = await fetch(`${NOTION_BASE}/databases/${env.NOTION_BLOGS_DB_ID}/query`, {
        method: "POST",
        headers: notionHeaders(env.NOTION_API_KEY),
        body: JSON.stringify(body)
    })
    if (!res.ok) {
        throw new Error(`notion database API error: ${res.status}.`)
    } else {
        const data = await res.json() as NotionQueryResponse
        const blogs = data.results.map(transformPageToMeta)
        return {
            blogs, hasMore: data.hasMore, nextCursor: data.nextCursor,
        }
    }
}


export async function getPublishedBlogBySlug(env: Env, slug: String): Promise<BlogPost | null> {
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
            pageSize: 1,
        }),
    })

    if (!res.ok) {
        throw new Error(`notion database api error: ${res.status}.`)
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
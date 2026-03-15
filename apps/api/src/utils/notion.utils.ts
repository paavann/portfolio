import type { BlogMeta, NotionPage, NotionPropertyValue } from "../types/notion.types"

const NOTION_VER = "2022-06-28"
export const notionHeaders = (apiKey: string): HeadersInit => {
    return {
        "Authorization": `Bearer ${apiKey}`,
        "Notion-Version": NOTION_VER,
        "Content-Type": "application/json",
    }
}


const extractText = (prop: NotionPropertyValue | undefined): string => {
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

const extractMultiSelect = (prop: NotionPropertyValue | undefined): string[] => {
    if (!prop || prop.type !== "multi_select") {
        return []
    } else {
        return prop.multi_select.map(o => o.name)
    }
}

const extractDate = (prop: NotionPropertyValue | undefined): string | null => {
    if (!prop || prop.type !== "date") {
        return null
    } else {
        return prop.date?.start ?? null
    }
}

const extractFile = (prop: NotionPropertyValue | undefined): string | null => {
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

export const transformPageToMeta = (page: NotionPage): BlogMeta => {
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


export class NotionApiError extends Error {
    status: number
    code: string

    constructor(status: number, message: string, code?: string) {
        super(message)
        this.name = "NotionApiError"
        this.status = status
        this.code = code ?? "NOTION_API_ERROR"
    }
}
export interface NotionRichText {
    plain_text: string
    href?: string | null
    annotations: {
        bold: boolean
        italic: boolean
        strikethrough: boolean
        underline: boolean
        code: boolean
        color: string
    }
}

export interface NotionFile {
    type: "external" | "file"
    external?: { url: string }
    file?: {
        url: string
        expiry_time: string
    }
}

export interface NotionSelectOption {
    id: string
    name: string
    color: string
}

export type NotionPropertyValue =
    | { type: "title"; title: NotionRichText[] }
    | { type: "rich_text"; rich_text: NotionRichText[] }
    | { type: "select"; select: NotionSelectOption | null }
    | { type: "multi_select"; multi_select: NotionSelectOption[] }
    | { type: "date"; date: { start: string; end?: string | null } | null }
    | { type: "files"; files: NotionFile[] }
    | { type: "checkbox"; checkbox: boolean }
    | { type: "url"; url: string | null }

export interface NotionPage {
    id: string
    properties: Record<string, NotionPropertyValue>
}

export interface NotionQueryResponse {
    results: NotionPage[]
    has_more: boolean
    next_cursor: string | null
}

export type NotionBlockType =
    | "paragraph"
    | "heading_1"
    | "heading_2"
    | "heading_3"
    | "bulleted_list_item"
    | "numbered_list_item"
    | "to_do"
    | "toggle"
    | "code"
    | "quote"
    | "callout"
    | "divider"
    | "image"
    | "bookmark"
    | "unsupported"

export interface NotionBlock {
    id: string
    type: NotionBlockType
    has_children: boolean
    [key: string]: unknown
}

export interface NotionBlocksResponse {
    results: NotionBlock[]
    has_more: boolean
    next_cursor: string | null
}

export interface BlogMeta {
    id: string
    slug: string
    title: string
    summary: string
    publishedAt: string | null
    tags: string[]
    cover: string | null
}

export interface BlogPost extends BlogMeta {
    blocks: NotionBlock[]
}
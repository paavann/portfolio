export interface RichText {
    type: "text";
    text: {
        content: string;
        link: { url: string } | null;
    };
    annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
    };
    plain_text: string;
    href: string | null;
}

export interface NotionBlock {
    object: "block";
    id: string;
    type: string;
    has_children: boolean;
    heading_1?: {
        rich_text: RichText[];
        color: string;
        is_toggleable: boolean;
    };
    heading_2?: {
        rich_text: RichText[];
        color: string;
        is_toggleable: boolean;
    };
    heading_3?: {
        rich_text: RichText[];
        color: string;
        is_toggleable: boolean;
    };
    paragraph?: {
        rich_text: RichText[];
        color: string;
    };
    bulleted_list_item?: {
        rich_text: RichText[];
        color: string;
    };
    numbered_list_item?: {
        rich_text: RichText[];
        color: string;
    };
    image?: {
        type: "external" | "file";
        external?: { url: string };
        file?: { url: string; expiry_time: string };
        caption?: RichText[];
    };
    child_page?: {
        title: string;
    };
    [key: string]: any;
}

export interface Blog {
    id: string;
    title: string;
    slug: string;
    summary: string;
    tags: string[];
    publishedAt: string;
    cover: string | null;
    blocks?: NotionBlock[];
}

export interface BlogsResponse {
    ok: boolean;
    cached: boolean;
    blogs: Blog[];
    hasMore: boolean;
    nextCursor: string | null;
}

export interface BlogResponse {
    ok: boolean;
    cached: boolean;
    blog: Blog;
}

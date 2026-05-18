import type { BlogsResponse, BlogResponse } from "../types/blog";

// Ensure this trailing slash is handled properly depending on your env var.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8787/api";

export async function fetchBlogs(cursor?: string): Promise<BlogsResponse> {
    const url = new URL(`${API_URL}/blogs`);
    if (cursor) {
        url.searchParams.append("cursor", cursor);
    }
    
    const res = await fetch(url.toString());
    if (!res.ok) {
        throw new Error("Failed to fetch blogs");
    }
    return res.json();
}

export async function fetchBlog(slug: string): Promise<BlogResponse> {
    const res = await fetch(`${API_URL}/blogs/${slug}`);
    if (!res.ok) {
        throw new Error("Failed to fetch blog");
    }
    return res.json();
}

import { getBlogsController, getBlogBySlugController, } from "./controllers/blog.controller"



export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url)
		const { pathname } = url

		if (pathname === "/api/blogs" && request.method === "GET") {
			return getBlogsController(request, env)
		} else if (pathname.startsWith("/api/blogs/") && request.method === "GET") {
			return getBlogBySlugController(request, env)
		}

		return new Response(
			JSON.stringify({ ok: false, error: "not found.", }),
			{ status: 404, headers: { "Content-Type": "application/json", } },
		)
	},
} satisfies ExportedHandler<Env>
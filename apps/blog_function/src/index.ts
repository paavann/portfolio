import { getBlogsController } from "./controllers/blog.controller"



export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url)
		const { pathname } = url

		if(pathname==="/api/admin/blogs" && request.method==="GET")
			return getBlogsController(request, env)

		return new Response(
			JSON.stringify({ error: "not found." }),
			{ status: 404, headers: { "Content-Type": "application/json" } },
		)
	},
} satisfies ExportedHandler<Env>

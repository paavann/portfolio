import { getBlogs, getBlogBySlug, } from "./controllers/blog.controller"
import { jsonResponse } from "./utils/res.utils"



export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url)
		const { pathname } = url

		const blogListRegex = /^\/api\/blogs\/?$/
		const blogPostRegex = /^\/api\/blogs\/([^\/]+)\/?$/

		const isGet = request.method === "GET"
		if (isGet && blogListRegex.test(pathname)) {
			return getBlogs(request, env)
		} else if (isGet && blogPostRegex.test(pathname)) {
			return getBlogBySlug(request, env)
		} else {
			return jsonResponse(
				{ ok: false, error: "not found.", }, 404,
			)
		}
	},
} satisfies ExportedHandler<Env>
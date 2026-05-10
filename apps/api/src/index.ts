import { getBlogs, getBlogBySlug, } from "./controllers/blog.controller"
import { jsonResponse, corsPreflightResponse } from "./utils/res.utils"



export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (request.method === "OPTIONS") {
			return corsPreflightResponse()
		} else {
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
					{ ok: false, error: "requested route not found or method not allowed.", }, 404,
				)
			}
		}
	},
} satisfies ExportedHandler<Env>
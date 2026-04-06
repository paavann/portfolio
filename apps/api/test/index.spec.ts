import { env, createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('API Routing & Handlers', () => {
	it('responds with 404 for unknown route', async () => {
		const request = new IncomingRequest('http://example.com/invalid-route')
		const response = await worker.fetch(request, env)

		expect(response.status).toBe(404);
		expect(await response.json()).toEqual({ ok: false, error: "not found." });
	});

	it('responds with 404 for deeply nested invalid routes', async () => {
		const request = new IncomingRequest('http://example.com/api/blogs/my-slug/extra-segment')
		const response = await worker.fetch(request, env)

		expect(response.status).toBe(404);
		expect(await response.json()).toEqual({ ok: false, error: "not found." });
	});
});

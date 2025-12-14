import { Handler } from "./types/handler"

interface Jwk {
    kid: string
    kty: string
    n: string
    e: string
    alg?: string
    use?: string
}

interface JwksResponse {
    keys: Jwk[]
}


async function requireAuth(request: Request, env: Env) {
    const token = request.headers.get("Cf-Access-Jwt-Assertion")
    if(!token) return { ok: false, error: "no token provided." }

    const [headerB64, payloadB64, signatureB64] = token.split('.')
    const header = JSON.parse(atob(headerB64))

    const jwks = await fetch(env.CLOUDFLARE_ACCESS_JWK_URL).then(res => res.json() as Promise<JwksResponse>)
    const jwk = jwks.keys.find(k => k.kid===header.kid)
    if(!jwk) return { ok: false, error: "invalid jwk. key id did not match any of the jwks from cloudflare." }

    const key = await crypto.subtle.importKey(
        "jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"],
    )
    const encoder = new TextEncoder()
    const data = encoder.encode(`${headerB64}.${payloadB64}`)
    const signature = Uint8Array.from(atob(signatureB64), c => c.charCodeAt(0))

    const isValid = await crypto.subtle.verify(
        "RSASSA-PKCS1-v1_5", key, signature, data,
    )
    if(!isValid) return { ok: false, error: "invalid signature." }

    const payload = JSON.parse(atob(payloadB64))
    if(payload.aud !== env.CLOUDFLARE_ACCESS_AUD) return { ok: false, error: "invalid audience." }

    return { ok: true, user: payload }
}


export function withAuth(handler: Handler): Handler {
    return async (request, env) => {
        const auth = await requireAuth(request, env)
        if(!auth.ok)
            return new Response(
                JSON.stringify({ error: auth.error }),
                { status: 401, headers: { "Content-Type": "application/json" } },
            )
        return handler(request, env)
    }
}
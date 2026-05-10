export const jsonResponse = (data: unknown, status = 200): Response => {
    return new Response(JSON.stringify(data), {
        status, headers: { "Content-Type": "application/json", ...corsHeaders },
    })
}


const corsHeaders: HeadersInit = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

export const corsPreflightResponse = (): Response => {
    return new Response(null, { status: 204, headers: corsHeaders })
}
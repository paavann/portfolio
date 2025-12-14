interface GetBlogsParam {
    limit: number
    offset: number
    published?: boolean
    from?: Date
    to?: Date
}


export async function getBlogs(db: D1Database, params: GetBlogsParam) {
    const { limit, offset, published, from, to } = params

    const whereClauses: string[] = []
    const bindings = []
    if(published!==undefined) {
        whereClauses.push("published = ?")
        bindings.push(published ? 1 : 0)
    }
    if(from) {
        whereClauses.push("created_at >= ?")
        bindings.push(from.toISOString())
    }
    if(to) {
        whereClauses.push("created_at <= ?")
        bindings.push(to.toISOString())
    }

    const whereSQL = whereClauses.length > 0 
        ? `WHERE ${whereClauses.join(" AND ")}`
        : ""
    const blogsQuery = `
        SELECT * FROM blogs ${whereSQL} ORDER BY created_at DESC LIMIT ? OFFSET ?
    `

    const { results: blogs } = await db.prepare(blogsQuery).bind(...bindings, limit, offset).all()
    const countQuery = `
        SELECT COUNT(*) as count FROM blogs ${whereSQL}
    `
    const { results: countResults } = await db.prepare(countQuery).bind(...bindings).all()
    return { blogs, total: countResults[0]?.count || 0 }
}
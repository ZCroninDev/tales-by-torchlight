import { createError, readBody } from "h3"

type SignupPayload = {
    name?: string
    email?: string
}

export default defineEventHandler(async (event) => {
    const body = await readBody<SignupPayload>(event)

    const name = body.name?.trim()
    const email = body.email?.trim()

    if (!name || !email) {
        throw createError({
            statusCode: 400,
            statusMessage: "Name and email are required to claim the freebies."
        })
    }

    const hubDatabase = await loadHubDatabase()
    if (!hubDatabase) {
        throw createError({
            statusCode: 503,
            statusMessage: "Database connection is unavailable. Enable NuxtHub or connect your backend before collecting sign-ups."
        })
    }

    const db = hubDatabase()

    await db
        .prepare(
            `
        CREATE TABLE IF NOT EXISTS freebies_signups (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            submitted_at TEXT NOT NULL
        )
        `
        )
        .run()

    await db
        .prepare(
            `
        INSERT INTO freebies_signups (name, email, submitted_at)
        VALUES (?1, ?2, ?3)
        `
        )
        .bind(name, email, new Date().toISOString())
        .run()

    return {
        ok: true
    }
})

async function loadHubDatabase() {
    try {
        const mod = await import("#imports")
        return mod.hubDatabase
    } catch {
        return undefined
    }
}

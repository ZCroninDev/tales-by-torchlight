import { createError, readBody } from "h3"
import { hubDatabase } from "#imports"

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

    const db = (() => {
        try {
            return hubDatabase()
        } catch (error: unknown) {
            throw createError({
                statusCode: 500,
                statusMessage:
                    (error as { message?: string })?.message ??
                    "Database connection is unavailable. Ensure NuxtHub local storage is configured."
            })
        }
    })()

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

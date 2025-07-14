import { neon } from "@neondatabase/serverless"

// The DATABASE_URL environment variable will be automatically provided by the Neon integration
const sql = neon(process.env.DATABASE_URL!)

export { sql }

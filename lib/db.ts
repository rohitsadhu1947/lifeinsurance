import { neon } from "@neondatabase/serverless"

// The DATABASE_URL environment variable will be automatically provided by the Neon integration
let sql: any = null

try {
  if (process.env.DATABASE_URL) {
    sql = neon(process.env.DATABASE_URL)
  } else {
    console.log("DATABASE_URL not configured, database operations will be mocked")
  }
} catch (error) {
  console.log("Database connection failed, database operations will be mocked:", error.message)
}

export { sql }

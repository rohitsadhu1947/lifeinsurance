import { sql } from "./db"

export async function testDatabaseConnection() {
  try {
    const result = await sql`SELECT NOW() as current_time`
    console.log("Database connected successfully:", result[0])
    return true
  } catch (error) {
    console.error("Database connection failed:", error)
    return false
  }
}

export async function getCustomersCount() {
  try {
    const result = await sql`SELECT COUNT(*) as count FROM customers`
    return result[0].count
  } catch (error) {
    console.error("Error getting customers count:", error)
    return 0
  }
}

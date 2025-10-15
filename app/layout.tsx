import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ExpertChatWidget } from "../components/AdvancedFeatures"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ICE by Ensuredit - Life Insurance Comparison Platform",
  description: "Compare life insurance plans from India's top insurers with ICE by Ensuredit",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem={false} 
          disableTransitionOnChange
        >
          {children}
          <ExpertChatWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}

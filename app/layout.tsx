import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Money Earning Agent - AI-Powered Income Opportunities',
  description: 'AI agent that finds and facilitates real money-earning opportunities in the digital world',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

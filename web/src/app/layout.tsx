import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import QueryProvider from '@/shared/lib/query-provider'
import ThemeRegistry from './theme-registry'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Drozdy',
  description: 'Drozdy',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <QueryProvider>{children}</QueryProvider>
        </ThemeRegistry>
      </body>
    </html>
  )
}

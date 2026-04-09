import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} bg-black`}>
      <body className="min-h-screen overflow-x-hidden bg-black font-sans antialiased text-white">
        {children}
      </body>
    </html>
  );
}

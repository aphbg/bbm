import './globals.css'

export const metadata = {
  title: 'Becoming Better Men',
  description: 'A structured transformation ecosystem for men ready to be honest about where they are.',
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%23131211'/%3E%3Ctext x='16' y='22' text-anchor='middle' font-family='sans-serif' font-weight='bold' font-size='14' fill='%23A0825C'%3EBBM%3C/text%3E%3C/svg%3E"
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

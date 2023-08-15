import '../globals.css'

export const metadata = {
  title: 'Staff Dashboard',
  description: 'Staff Dashboard for BIT MESRA',
}

export default function adminLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
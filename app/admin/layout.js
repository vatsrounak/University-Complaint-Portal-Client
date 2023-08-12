import '../globals.css'

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard for NIT Patna',
}

export default function adminLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
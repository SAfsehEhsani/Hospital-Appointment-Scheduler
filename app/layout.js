import './globals.css'

export const metadata = {
  title: 'Hospital Appointment Scheduler',
  description: 'Schedule doctor appointments efficiently',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

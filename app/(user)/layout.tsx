import Banner from '../../components/Banner'
import Header from '../../components/Header'
import '../../styles/globals.css'
import { Nunito_Sans } from '@next/font/google'


const nunitoSans = Nunito_Sans({ 
  subsets: ['latin'],
  weight: '400'
 })


export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`max-w-7xl mx-auto bg-zinc-50 ${nunitoSans.className}`}>
        <Header />
        <Banner />
        {children}
      </body>
    </html>
  )
}
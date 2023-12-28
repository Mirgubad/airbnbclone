import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import RentModal from './components/Modals/RentModal'
import Navbar from './components/Navbar'
import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/Modals/RegisterModal'
import LoginModal from './components/Modals/LoginModal'

import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb Clone',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <head>
        <link rel="icon" sizes="192x192" href="https://a0.muscache.com/airbnb/static/icons/android-icon-192x192-c0465f9f0380893768972a31a614b670.png"></link>
      </head>
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          {/* <Modal actionLabel='Button' title='Hello world' isOpen /> */}
          <RegisterModal />
          <LoginModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-20">
          {children}
        </div>
      </body>
    </html>
  )
}

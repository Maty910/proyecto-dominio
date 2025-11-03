import type { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-surface shadow-sm border-b border-gray-200 py-4 px-8 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-primary">Hotel Booking</h1>
        <nav className="flex gap-4 text-gray-600">
          <a href="#" className="hover:text-primary">Home</a>
          <a href="#" className="hover:text-primary">Reservations</a>
          <a href="#" className="hover:text-primary">Login</a>
        </nav>
      </header>

      <main className="flex-1 flex justify-center items-center px-4 py-8">
        {children}
      </main>

      <footer className="bg-surface border-t border-gray-200 text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} Hotel Booking App — All rights reserved.
      </footer>
    </div>
  )
}
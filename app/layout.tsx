import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iceland Roadtrip Blog",
  description: "Vuelta a Islandia en coche – planning y guía",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen">
        <header className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold">Iceland Roadtrip</Link>
          <nav className="flex gap-4 text-sm text-gray-300">
            <Link href="/itinerario">Itinerario</Link>
            <Link href="/consejos">Consejos</Link>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          </nav>
        </header>
        <main className="max-w-5xl mx-auto px-4 pb-16">{children}</main>
        <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-400">© {new Date().getFullYear()} Iceland Roadtrip</footer>
      </body>
    </html>
  );
}

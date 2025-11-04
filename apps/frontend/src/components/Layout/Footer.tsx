export default function Footer() {
  return (
    <footer className="bg-surface border-t border-gray-200 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Hotel Now — All rights reserved.
      </div>
    </footer>
  )
}

import { Hero } from "../components/Hero/Hero"
import { Features } from "../components/Features/Features"
import { CallToAction } from "../components/CTA/CallToAction"

export default function HomePage() {
  return (
    <main className="bg-background text-secondary">
      <Hero />
      <Features />
      <CallToAction />
    </main>
  )
}

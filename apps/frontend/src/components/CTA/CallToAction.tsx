import { Button } from "../ui/Button"

export function CallToAction() {
  return (
      <section className="py-20 bg-primary text-white text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Ready to enjoy your next stay?
        </h2>
        <p className="text-lg mb-8">
          Join our community and get exclusive deals and updates.
        </p>
        <Button variant="secondary" size="lg">
          Sign Up Now
        </Button>
      </section>
  )
}
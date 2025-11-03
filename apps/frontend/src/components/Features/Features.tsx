export function Features() {
  return (
      <section className="py-16 bg-surface border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "Comfort Rooms",
              desc: "Spacious rooms designed for relaxation and privacy.",
              icon: "🛏️",
            },
            {
              title: "Fine Dining",
              desc: "Enjoy exquisite meals crafted by top chefs.",
              icon: "🍽️",
            },
            {
              title: "24/7 Service",
              desc: "Our team is here to assist you anytime, day or night.",
              icon: "💁‍♂️",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-6 bg-background rounded-xl shadow-sm border border-gray-200"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-secondary">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
  )
}
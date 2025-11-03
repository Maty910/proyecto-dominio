import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Design/Typography',
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj

export const AllVariants: Story = {
  render: () => (
    <div className="max-w-2xl p-8 bg-surface rounded-xl shadow-sm space-y-8">
      <section>
        <h1>Heading 1 – Lorem ipsum, dolor sit amet consectetur adipisicing elit</h1>
        <h2>Heading 2 – Lorem ipsum, dolor sit amet consectetur adipisicing elit</h2>
        <h3>Heading 3 – Lorem ipsum, dolor sit amet consectetur adipisicing elit</h3>
        <h4>Heading 4 – Lorem ipsum, dolor sit amet consectetur adipisicing elit</h4>
        <h5>Heading 5 – Lorem ipsum, dolor sit amet consectetur adipisicing elit</h5>
        <h6>Heading 6 – Lorem ipsum, dolor sit amet consectetur adipisicing elit</h6>
      </section>

      <section>
        <p>
          Body text – Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed non risus. Suspendisse lectus tortor, dignissim sit amet,
          adipiscing nec, ultricies sed, dolor.
        </p>
        <p className="caption mt-2">
          Caption – Smaller text used for annotations or helper info.
        </p>
      </section>

      <section className="flex gap-4 flex-wrap mt-6">
        <span className="px-3 py-1 bg-primary text-white rounded-lg">
          Primary color
        </span>
        <span className="px-3 py-1 bg-secondary text-white rounded-lg">
          Secondary color
        </span>
        <span className="px-3 py-1 bg-accent text-secondary rounded-lg">
          Accent color
        </span>
        <span className="px-3 py-1 bg-danger text-white rounded-lg">
          Danger color
        </span>
        <span className="px-3 py-1 bg-background text-secondary rounded-lg border">
          Background
        </span>
        <span className="px-3 py-1 bg-surface text-secondary rounded-lg border">
          Surface
        </span>
      </section>
    </div>
  ),
}

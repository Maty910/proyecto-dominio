import type { Preview } from '@storybook/react';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true, // ← Movido aquí
    },
    a11y: {
      test: 'todo'
    }
  },
};

export default preview;
import { createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/docs/concepts/guards')({
  component: () => {
    return (
      <div class='prose max-w-none'>
        <h1 class='text-4xl font-bold text-gray-900 mb-4'>Guards</h1>
        <p class='text-lg text-gray-700 mb-6'>
          Guards are boolean conditions that determine whether a transition
          should occur. They provide conditional logic for state
          transitions.
        </p>
        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Using Guards
          </h2>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`const config = createConfig({
  initial: 'counting',
  context: { count: 0, max: 10 },
  states: {
    counting: {
      on: {
        INCREMENT: {
          target: 'counting',
          guard: 'belowMax',
          actions: 'increment',
        },
        MAX_REACHED: 'complete',
      },
    },
    complete: {
      type: 'final',
    },
  },
});`}</code>
            </pre>
          </div>
        </section>
        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Best Practices
          </h2>
          <ul class='list-disc list-inside space-y-2 text-gray-700'>
            <li>Keep guards simple and focused on a single condition</li>
            <li>Use descriptive names that explain the condition</li>
            <li>
              Avoid side effects in guards - they should be pure functions
            </li>
          </ul>
        </section>
      </div>
    );
  },
});

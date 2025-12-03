import { createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/docs/concepts/delays')({
  component: () => {
    return (
      <div class='prose max-w-none'>
        <h1 class='text-4xl font-bold text-gray-900 mb-4'>Delays</h1>
        <p class='text-lg text-gray-700 mb-6'>
          Delays allow you to trigger transitions after a specified amount
          of time, useful for timeouts and timed transitions.
        </p>
        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Using Delays
          </h2>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`const config = createConfig({
  initial: 'idle',
  states: {
    idle: {
      on: { START: 'running' },
    },
    running: {
      after: {
        5000: 'timeout',
      },
      on: { STOP: 'idle' },
    },
    timeout: {
      entry: 'notifyTimeout',
      on: { RETRY: 'running' },
    },
  },
});`}</code>
            </pre>
          </div>
        </section>
      </div>
    );
  },
});

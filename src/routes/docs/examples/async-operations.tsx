import { createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/docs/examples/async-operations')({
  component: () => {
    return (
      <div class='prose max-w-none'>
        <h1 class='text-4xl font-bold text-gray-900 mb-4'>
          Async Operations Example
        </h1>
        <p class='text-lg text-gray-700 mb-6'>
          Handle asynchronous operations like API calls with state
          machines.
        </p>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Implementation
          </h2>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`import { createMachine, interpret } from '@bemedev/app-ts';

const fetchMachine = createMachine({
  initial: 'idle',
  states: {
    idle: {
      on: {
        FETCH: '/loading',
      },
    },
    loading: {
      on: {
        SUCCESS: {
          target: '/success',
          actions: 'setData',
        },
        ERROR: {
          target: '/error',
          actions: 'setError',
        },
      },
      promises: {
        fetchData: 'fetchData',
      },
    },
    success: {
      on: {
        REFETCH: '/loading',
        RESET: '/idle',
      },
    },
    error: {
      on: {
        RETRY: '/loading',
        RESET: '/idle',
      },
    },
  },
}).provideOptions(({ assign }) => ({
  actions: {
    setData: assign('context', ({ context, event }) => ({
      ...context,
      data: event.data,
      error: null,
    })),
    setError: assign('context', ({ context, event }) => ({
      ...context,
      error: event.error,
      data: null,
    })),
  },
  promises: {
    fetchData: async () => {
      const response = await fetch('/api/data');
      return response.json();
    },
  },
}));

// Create the service with initial context
const service = interpret(fetchMachine, {
  context: {
    data: null,
    error: null,
  },
});`}</code>
            </pre>
          </div>
        </section>
      </div>
    );
  },
});

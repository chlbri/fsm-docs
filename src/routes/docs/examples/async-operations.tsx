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
              <code>{`import { createConfig, createChildS } from '@bemedev/app-ts';

const fetchConfig = createConfig({
  initial: 'idle',
  context: {
    data: null,
    error: null,
  },
  pContext: {},
  states: {
    idle: {
      on: {
        FETCH: 'loading',
      },
    },
    loading: {
      entry: 'fetchData',
      on: {
        SUCCESS: {
          target: 'success',
          actions: 'setData',
        },
        ERROR: {
          target: 'error',
          actions: 'setError',
        },
      },
    },
    success: {
      on: {
        REFETCH: 'loading',
        RESET: 'idle',
      },
    },
    error: {
      on: {
        RETRY: 'loading',
        RESET: 'idle',
      },
    },
  },
});

const actions = {
  fetchData: async (context: any) => {
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      return { ...context, data, error: null };
    } catch (error) {
      return {
        ...context,
        error: 'Failed to fetch data',
        data: null,
      };
    }
  },
  
  setData: (context: any, event: any) => ({
    ...context,
    data: event.data,
    error: null,
  }),
  
  setError: (context: any, event: any) => ({
    ...context,
    error: event.error,
    data: null,
  }),
};`}</code>
            </pre>
          </div>
        </section>
      </div>
    );
  },
});

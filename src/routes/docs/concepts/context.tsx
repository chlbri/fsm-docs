import { createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/docs/concepts/context')({
  component: () => {
    return (
      <div class='prose max-w-none'>
        <h1 class='text-4xl font-bold text-gray-900 mb-4'>Context</h1>
        <p class='text-lg text-gray-700 mb-6'>
          Context is the data associated with a state machine. It
          represents the extended state that changes over time as the
          machine processes events.
        </p>
        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Public and Private Context
          </h2>
          <p class='text-gray-700 mb-4'>
            @bemedev/app-ts supports both public context (accessible
            externally) and private context (internal to the machine):
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`const machine = createMachine({
  initial: 'idle',
  states: {
    idle: {
      on: { INCREMENT: { target: 'idle', actions: 'increment' } },
    },
  },
});

// Context is provided when interpreting the machine
const service = interpret(machine, {
  context: {
    // Public context
    count: 0,
    user: null,
  },
  pContext: {
    // Private context
    internalState: {},
  },
});`}</code>
            </pre>
          </div>
        </section>
        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Updating Context
          </h2>
          <p class='text-gray-700 mb-4'>
            Context is updated through actions. Always return a new context
            object:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`const actions = {
  increment: (context) => ({
    ...context,
    count: context.count + 1,
  }),
  
  setUser: (context, event) => ({
    ...context,
    user: event.user,
  }),
};`}</code>
            </pre>
          </div>
        </section>
      </div>
    );
  },
});

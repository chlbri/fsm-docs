import { createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/docs/api/interpreter')({
  component: () => {
    return (
      <div class='prose max-w-none'>
        <h1 class='text-4xl font-bold text-gray-900 mb-4'>
          Interpreter API
        </h1>
        <p class='text-lg text-gray-700 mb-6'>
          The interpreter provides methods to interact with a running state
          machine instance.
        </p>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Properties
          </h2>

          <div class='border border-gray-200 rounded-lg p-4 mb-4'>
            <h3 class='font-semibold text-gray-900 mb-2'>state</h3>
            <p class='text-gray-700 mb-2'>
              Type:{' '}
              <code class='bg-gray-100 px-2 py-1 rounded text-sm'>
                string
              </code>
            </p>
            <p class='text-gray-700'>The current state of the machine</p>
          </div>

          <div class='border border-gray-200 rounded-lg p-4 mb-4'>
            <h3 class='font-semibold text-gray-900 mb-2'>context</h3>
            <p class='text-gray-700 mb-2'>
              Type:{' '}
              <code class='bg-gray-100 px-2 py-1 rounded text-sm'>
                Context
              </code>
            </p>
            <p class='text-gray-700'>The current public context</p>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Methods
          </h2>

          <div class='border border-gray-200 rounded-lg p-4 mb-4'>
            <h3 class='font-semibold text-gray-900 mb-2'>send(event)</h3>
            <p class='text-gray-700 mb-2'>Sends an event to the machine</p>
            <div class='bg-gray-900 text-gray-100 p-4 rounded-lg mt-2'>
              <pre class='text-sm'>
                <code>{`machine.send({ type: 'EVENT_NAME' });
machine.send({ type: 'UPDATE', data: {...} });`}</code>
              </pre>
            </div>
          </div>

          <div class='border border-gray-200 rounded-lg p-4'>
            <h3 class='font-semibold text-gray-900 mb-2'>
              subscribe(callback)
            </h3>
            <p class='text-gray-700 mb-2'>Subscribe to state changes</p>
            <div class='bg-gray-900 text-gray-100 p-4 rounded-lg mt-2'>
              <pre class='text-sm'>
                <code>{`const unsubscribe = machine.subscribe((state, context) => {
  console.log('State:', state);
  console.log('Context:', context);
});

// Later: unsubscribe()`}</code>
              </pre>
            </div>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Example
          </h2>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`import { createConfig, createChildS } from '@bemedev/app-ts';

const config = createConfig({
  initial: 'idle',
  context: { value: 0 },
  pContext: {},
  states: {
    idle: {
      on: { START: 'active' },
    },
    active: {
      on: { STOP: 'idle' },
    },
  },
});

const machine = createChildS(config, {
  context: { value: 0 },
  pContext: {},
});

// Get current state
console.log(machine.state); // 'idle'

// Send events
machine.send({ type: 'START' });
console.log(machine.state); // 'active'

// Access context
console.log(machine.context.value); // 0`}</code>
            </pre>
          </div>
        </section>
      </div>
    );
  },
});

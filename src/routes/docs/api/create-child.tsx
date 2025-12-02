import { createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/docs/api/create-child')({
  component: () => {
    return (
      <div class='prose max-w-none'>
        <h1 class='text-4xl font-bold text-gray-900 mb-4'>createChildS</h1>
        <p class='text-lg text-gray-700 mb-6'>
          Creates a child service (machine instance) from a configuration.
        </p>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Signature
          </h2>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`function createChildS<T extends KeyU<'config' | 'context' | 'pContext'>>(
  machine: T,
  initials: {
    pContext: PrivateContextFrom<T>;
    context: ContextFrom<T>;
  },
  ...subscribers: SubscriberType[]
): ChildS`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Parameters
          </h2>

          <div class='border border-gray-200 rounded-lg p-4 mb-4'>
            <h3 class='font-semibold text-gray-900 mb-2'>machine</h3>
            <p class='text-gray-700'>
              The machine configuration created with createConfig
            </p>
          </div>

          <div class='border border-gray-200 rounded-lg p-4 mb-4'>
            <h3 class='font-semibold text-gray-900 mb-2'>initials</h3>
            <p class='text-gray-700'>
              Object containing initial context and private context values
            </p>
          </div>

          <div class='border border-gray-200 rounded-lg p-4'>
            <h3 class='font-semibold text-gray-900 mb-2'>subscribers</h3>
            <p class='text-gray-700'>
              Optional subscribers to observe state changes
            </p>
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
  context: { count: 0 },
  pContext: {},
  states: {
    idle: {
      on: { START: 'running' },
    },
    running: {
      on: { STOP: 'idle' },
    },
  },
});

const machine = createChildS(
  config,
  {
    context: { count: 0 },
    pContext: {},
  }
);

// Use the machine
machine.send({ type: 'START' });
console.log(machine.state); // 'running'`}</code>
            </pre>
          </div>
        </section>
      </div>
    );
  },
});

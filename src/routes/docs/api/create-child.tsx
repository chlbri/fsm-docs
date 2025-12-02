import { createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/docs/api/create-child')({
  component: () => {
    return (
      <div class='prose max-w-none'>
        <h1 class='text-4xl font-bold text-gray-900 mb-4'>createChild</h1>
        <p class='text-lg text-gray-700 mb-6'>
          A helper function used inside{' '}
          <code class='bg-gray-100 px-2 py-1 rounded text-sm'>
            provideOptions
          </code>{' '}
          or{' '}
          <code class='bg-gray-100 px-2 py-1 rounded text-sm'>
            addOptions
          </code>{' '}
          to create child machines.
        </p>

        <div class='bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8'>
          <p class='text-yellow-900'>
            <strong>Note:</strong>{' '}
            <code class='bg-yellow-100 px-2 py-1 rounded text-sm'>
              createChildS
            </code>{' '}
            is NOT meant for external use. Use the{' '}
            <code class='bg-yellow-100 px-2 py-1 rounded text-sm'>
              createChild
            </code>{' '}
            helper provided in the callback of{' '}
            <code class='bg-yellow-100 px-2 py-1 rounded text-sm'>
              provideOptions
            </code>{' '}
            or{' '}
            <code class='bg-yellow-100 px-2 py-1 rounded text-sm'>
              addOptions
            </code>
            .
          </p>
        </div>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Signature
          </h2>
          <p class='text-gray-700 mb-4'>
            The{' '}
            <code class='bg-gray-100 px-2 py-1 rounded text-sm'>
              createChild
            </code>{' '}
            helper is available in the callback:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`machine.provideOptions(({ createChild }) => ({
  machines: {
    childMachineName: createChild(
      childMachine,
      { context: initialContext },
      { events: 'FULL' }
    ),
  },
}));`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Parameters
          </h2>

          <div class='border border-gray-200 rounded-lg p-4 mb-4'>
            <h3 class='font-semibold text-gray-900 mb-2'>childMachine</h3>
            <p class='text-gray-700'>
              The child machine created with createMachine
            </p>
          </div>

          <div class='border border-gray-200 rounded-lg p-4 mb-4'>
            <h3 class='font-semibold text-gray-900 mb-2'>initials</h3>
            <p class='text-gray-700'>
              Object containing initial context for the child machine
            </p>
          </div>

          <div class='border border-gray-200 rounded-lg p-4'>
            <h3 class='font-semibold text-gray-900 mb-2'>options</h3>
            <p class='text-gray-700'>
              Configuration options like event forwarding
            </p>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Example
          </h2>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`import { createMachine } from '@bemedev/app-ts';

// Define a child machine
const childMachine = createMachine({
  initial: 'idle',
  states: {
    idle: {
      on: { START: '/running' },
    },
    running: {
      on: { STOP: '/idle' },
    },
  },
});

// Define a parent machine with child
const parentMachine = createMachine({
  initial: 'active',
  states: {
    active: {
      on: { DEACTIVATE: '/inactive' },
    },
    inactive: {
      on: { ACTIVATE: '/active' },
    },
  },
}).provideOptions(({ createChild }) => ({
  machines: {
    // Use createChild helper to create the child
    childProcess: createChild(
      childMachine,
      { context: { step: 0 } },
      { events: 'FULL' }
    ),
  },
}));

// Interpret and use
const service = interpret(parentMachine, { context: {} });
service.send({ type: 'DEACTIVATE' });`}</code>
            </pre>
          </div>
        </section>
      </div>
    );
  },
});

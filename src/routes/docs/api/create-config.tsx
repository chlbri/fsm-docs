import { createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/docs/api/create-config')({
  component: () => {
    return (
      <div class='prose max-w-none'>
        <h1 class='text-4xl font-bold text-gray-900 mb-4'>createConfig</h1>
        <p class='text-lg text-gray-700 mb-6'>
          Creates a type-safe machine configuration object.
        </p>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Signature
          </h2>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`function createConfig<const T extends Config>(config: T): T`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Parameters
          </h2>
          <div class='border border-gray-200 rounded-lg p-4'>
            <h3 class='font-semibold text-gray-900 mb-2'>config</h3>
            <p class='text-gray-700 mb-2'>
              Type:{' '}
              <code class='bg-gray-100 px-2 py-1 rounded text-sm'>
                Config
              </code>
            </p>
            <p class='text-gray-700'>
              The machine configuration object containing states, initial
              state, context, and transitions.
            </p>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Returns
          </h2>
          <p class='text-gray-700'>
            The same configuration object with full type inference. This
            function is primarily used for type safety.
          </p>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Configuration Object
          </h2>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`interface Config {
  initial: string;
  context?: any;
  pContext?: any;
  states: {
    [stateName: string]: {
      on?: {
        [eventType: string]: string | TransitionConfig;
      };
      entry?: string | string[];
      exit?: string | string[];
      after?: {
        [delay: number]: string;
      };
      type?: 'final' | 'parallel';
      states?: Config['states'];
    };
  };
}`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Example
          </h2>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`import { createConfig } from '@bemedev/app-ts';

const lightConfig = createConfig({
  initial: 'green',
  context: { timer: 0 },
  states: {
    green: {
      entry: 'startTimer',
      after: { 10000: 'yellow' },
      on: { EMERGENCY: 'red' },
    },
    yellow: {
      after: { 3000: 'red' },
    },
    red: {
      after: { 10000: 'green' },
      on: { EMERGENCY_END: 'green' },
    },
  },
});`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            See Also
          </h2>
          <ul class='list-disc list-inside space-y-2 text-gray-700'>
            <li>
              <a
                href='/docs/api/create-child'
                class='text-blue-600 hover:underline'
              >
                createChildS
              </a>{' '}
              - Create a machine instance
            </li>
            <li>
              <a
                href='/docs/concepts/state-machines'
                class='text-blue-600 hover:underline'
              >
                State Machines
              </a>{' '}
              - Core concepts
            </li>
          </ul>
        </section>
      </div>
    );
  },
});

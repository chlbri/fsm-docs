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
            Defining Guards
          </h2>
          <p class='text-gray-700 mb-4'>
            Guards (predicates) are defined using{' '}
            <code class='bg-gray-100 px-2 py-1 rounded text-sm'>
              provideOptions
            </code>{' '}
            with helpers like{' '}
            <code class='bg-gray-100 px-2 py-1 rounded text-sm'>
              isValue
            </code>
            :
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`const machine = createMachine({
  initial: 'counting',
  states: {
    counting: {
      on: {
        INCREMENT: {
          // No target = executes action without transition
          guards: 'belowMax',
          actions: 'increment',
        },
        MAX_REACHED: '/complete',
      },
    },
    complete: {
      type: 'final',
    },
  },
}).provideOptions(({ isValue, isNotValue, assign }) => ({
  predicates: {
    belowMax: ({ context }) => context.count < context.max,
    atMax: ({ context }) => context.count >= context.max,
    isEmpty: isValue('context.count', 0),
    notEmpty: isNotValue('context.count', 0),
  },
  actions: {
    increment: assign('context.count', ({ context }) => context.count + 1),
  },
}));`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Built-in Guard Helpers
          </h2>
          <p class='text-gray-700 mb-4'>
            Use{' '}
            <code class='bg-gray-100 px-2 py-1 rounded text-sm'>
              isValue
            </code>{' '}
            and{' '}
            <code class='bg-gray-100 px-2 py-1 rounded text-sm'>
              isNotValue
            </code>{' '}
            for simple comparisons:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`machine.provideOptions(({ isValue, isNotValue }) => ({
  predicates: {
    // Check if value equals
    isEmpty: isValue('context.items', []),
    isZero: isValue('context.count', 0),
    
    // Check if value differs
    hasItems: isNotValue('context.items', []),
    notZero: isNotValue('context.count', 0),
    
    // Custom predicates
    isAuthenticated: ({ context }) => context.token !== undefined,
    hasPermission: ({ context, event }) => 
      context.permissions.includes(event.permission),
  },
}));`}</code>
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
            <li>
              Use built-in helpers (isValue, isNotValue) when possible
            </li>
            <li>Guards are called predicates in the options object</li>
          </ul>
        </section>
      </div>
    );
  },
});

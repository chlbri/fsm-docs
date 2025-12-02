import { createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/docs/introduction')({
  component: () => {
    return (
      <div class='prose max-w-none'>
        <h1 class='text-4xl font-bold text-gray-900 mb-4'>
          Introduction to @bemedev/app-ts
        </h1>

        <p class='text-lg text-gray-700 mb-6'>
          A powerful TypeScript library for creating and managing finite
          state machines with full type safety and modern features.
        </p>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            What is a State Machine?
          </h2>
          <p class='text-gray-700 mb-4'>
            A state machine is a computational model used to design systems
            that can be in one of a finite number of states at any given
            time. State machines help you manage complex application logic
            by making state transitions explicit and predictable.
          </p>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Features
          </h2>
          <ul class='list-disc list-inside space-y-2 text-gray-700'>
            <li>
              <strong>Typed state machine creation</strong> - Full
              TypeScript support with type inference
            </li>
            <li>
              <strong>Public and private context management</strong> -
              Separate contexts for internal and external state
            </li>
            <li>
              <strong>Actions, guards, and delays</strong> - Rich feature
              set for complex state transitions
            </li>
            <li>
              <strong>Transition and event handling</strong> - Robust event
              system with type safety
            </li>
            <li>
              <strong>Nested machines</strong> - Compose complex state
              machines from simpler ones
            </li>
            <li>
              <strong>Subscribables support</strong> - Integration with
              RxJS and other reactive libraries
            </li>
          </ul>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Why @bemedev/app-ts?
          </h2>
          <p class='text-gray-700 mb-4'>
            Modern applications require predictable state management. This
            library provides:
          </p>
          <ul class='list-disc list-inside space-y-2 text-gray-700'>
            <li>
              Explicit state transitions that are easy to understand and
              debug
            </li>
            <li>
              Type-safe development experience with full TypeScript
              integration
            </li>
            <li>Declarative configuration that serves as documentation</li>
            <li>
              Testable architecture with clear separation of concerns
            </li>
            <li>
              Flexible event system that works with synchronous and
              asynchronous operations
            </li>
          </ul>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Quick Example
          </h2>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto'>
            <pre class='text-sm'>
              <code>{`import { createMachine } from '@bemedev/app-ts';

const toggleMachine = createMachine({
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        TOGGLE: 'active',
      },
    },
    active: {
      on: {
        TOGGLE: 'inactive',
      },
    },
  },
});`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Next Steps
          </h2>
          <p class='text-gray-700 mb-4'>
            Ready to get started? Check out the following resources:
          </p>
          <ul class='list-disc list-inside space-y-2 text-gray-700'>
            <li>
              <a
                href='/docs/installation'
                class='text-blue-600 hover:underline'
              >
                Installation Guide
              </a>{' '}
              - Set up @bemedev/app-ts in your project
            </li>
            <li>
              <a
                href='/docs/quick-start'
                class='text-blue-600 hover:underline'
              >
                Quick Start
              </a>{' '}
              - Build your first state machine
            </li>
            <li>
              <a
                href='/docs/concepts/state-machines'
                class='text-blue-600 hover:underline'
              >
                Core Concepts
              </a>{' '}
              - Understand the fundamentals
            </li>
          </ul>
        </section>
      </div>
    );
  },
});

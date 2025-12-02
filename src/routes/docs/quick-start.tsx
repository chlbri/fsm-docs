import { createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/docs/quick-start')({
  component: () => {
    return (
      <div class='prose max-w-none'>
        <h1 class='text-4xl font-bold text-gray-900 mb-4'>Quick Start</h1>

        <p class='text-lg text-gray-700 mb-6'>
          Learn how to create your first state machine with @bemedev/app-ts
          in minutes.
        </p>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Basic State Machine
          </h2>
          <p class='text-gray-700 mb-4'>
            Let's create a simple toggle machine that switches between two
            states:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`import { createMachine } from '@bemedev/app-ts';

// Define the machine configuration
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
            Adding Context
          </h2>
          <p class='text-gray-700 mb-4'>
            State machines can maintain context (data) that changes as the
            machine transitions:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`import { createMachine, interpret } from '@bemedev/app-ts';

const counterMachine = createMachine({
  initial: 'idle',
  states: {
    idle: {
      on: {
        INCREMENT: {
          target: 'idle',
          actions: 'incrementCount',
        },
        DECREMENT: {
          target: 'idle',
          actions: 'decrementCount',
        },
      },
    },
  },
});

// Context is provided when interpreting the machine
const service = interpret(counterMachine, {
  context: { count: 0 },
});`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Using Guards
          </h2>
          <p class='text-gray-700 mb-4'>
            Guards are conditions that must be true for a transition to
            occur:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`import { createMachine, interpret } from '@bemedev/app-ts';

const limitedCounterMachine = createMachine({
  initial: 'counting',
  states: {
    counting: {
      on: {
        INCREMENT: {
          target: 'counting',
          guards: 'canIncrement',
          actions: 'incrementCount',
        },
        RESET: {
          target: 'counting',
          actions: 'resetCount',
        },
      },
    },
  },
});

// Context is provided when interpreting the machine
const service = interpret(limitedCounterMachine, {
  context: { count: 0, max: 10 },
});`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Creating an Interpreter
          </h2>
          <p class='text-gray-700 mb-4'>
            To use your state machine, create an interpreter that can send
            events and track state:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`import { createMachine, interpret } from '@bemedev/app-ts';

const toggleMachine = createMachine({
  initial: 'inactive',
  states: {
    inactive: {
      on: { TOGGLE: 'active' },
    },
    active: {
      on: { TOGGLE: 'inactive' },
    },
  },
});

// Create the service with initial context
const service = interpret(toggleMachine, {
  context: { count: 0 },
});

// Send events
service.send({ type: 'TOGGLE' });
console.log(service.value); // 'active'

service.send({ type: 'TOGGLE' });
console.log(service.value); // 'inactive'`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            What's Next?
          </h2>
          <p class='text-gray-700 mb-4'>
            Now that you understand the basics, explore more advanced
            features:
          </p>
          <ul class='list-disc list-inside space-y-2 text-gray-700'>
            <li>
              <a
                href='/docs/concepts/actions'
                class='text-blue-600 hover:underline'
              >
                Actions
              </a>{' '}
              - Execute side effects during transitions
            </li>
            <li>
              <a
                href='/docs/concepts/guards'
                class='text-blue-600 hover:underline'
              >
                Guards
              </a>{' '}
              - Add conditional logic to transitions
            </li>
            <li>
              <a
                href='/docs/concepts/delays'
                class='text-blue-600 hover:underline'
              >
                Delays
              </a>{' '}
              - Handle time-based transitions
            </li>
            <li>
              <a
                href='/docs/examples/traffic-light'
                class='text-blue-600 hover:underline'
              >
                Examples
              </a>{' '}
              - See complete implementations
            </li>
          </ul>
        </section>
      </div>
    );
  },
});

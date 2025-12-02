import { createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/docs/concepts/events')({
  component: () => {
    return (
      <div class='prose max-w-none'>
        <h1 class='text-4xl font-bold text-gray-900 mb-4'>Events</h1>

        <p class='text-lg text-gray-700 mb-6'>
          Events are the primary way to trigger state transitions in
          @bemedev/app-ts. Learn how to define, send, and handle events
          effectively.
        </p>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Event Basics
          </h2>
          <p class='text-gray-700 mb-4'>
            Events are objects that contain a{' '}
            <code class='bg-gray-100 px-2 py-1 rounded text-sm'>type</code>{' '}
            property and optionally include additional data:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`// Simple event
{ type: 'SUBMIT' }

// Event with payload
{ type: 'UPDATE', data: { name: 'John', age: 30 } }

// Event with multiple properties
{ type: 'ERROR', message: 'Failed to load', code: 404 }`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Defining Event Handlers
          </h2>
          <p class='text-gray-700 mb-4'>
            Event handlers are defined in the{' '}
            <code class='bg-gray-100 px-2 py-1 rounded text-sm'>on</code>{' '}
            property of a state:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`import { createMachine } from '@bemedev/app-ts';

const machine = createMachine({
  initial: 'idle',
  states: {
    idle: {
      on: {
        // Simple transition to another state
        START: '/running',
        
        // Transition with actions
        LOAD: {
          target: '/loading',
          actions: 'fetchData',
        },
        
        // Action without state change (no target)
        REFRESH: {
          actions: 'updateTimestamp',
        },
      },
    },
    running: {
      on: {
        STOP: '/idle',
        PAUSE: '/paused',
      },
    },
    paused: {
      on: {
        RESUME: '/running',
        STOP: '/idle',
      },
    },
    loading: {
      on: {
        SUCCESS: '/idle',
        ERROR: '/error',
      },
    },
    error: {
      on: {
        RETRY: '/loading',
        CANCEL: '/idle',
      },
    },
  },
});`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Sending Events
          </h2>
          <p class='text-gray-700 mb-4'>
            <strong>Important:</strong> Events can ONLY be sent through the
            interpreter. Once you interpret a machine, send events using
            the{' '}
            <code class='bg-gray-100 px-2 py-1 rounded text-sm'>send</code>{' '}
            method:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`import { createMachine, interpret } from '@bemedev/app-ts';

const machine = createMachine({
  initial: 'idle',
  states: {
    idle: {
      on: { START: '/running' },
    },
    running: {
      on: { PAUSE: '/paused' },
    },
    paused: {
      on: { RESUME: '/running' },
    },
  },
});

// Events can ONLY be sent by the interpreter
const service = interpret(machine, { context: {} });

// Send a simple event
service.send({ type: 'START' });

// Send an event with payload
service.send({
  type: 'UPDATE',
  data: { userId: 123, name: 'Alice' },
});

// Chain multiple events
service.send({ type: 'START' });
service.send({ type: 'PAUSE' });
service.send({ type: 'RESUME' });`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Delayed Events
          </h2>
          <p class='text-gray-700 mb-4'>
            Trigger events automatically after a delay using the{' '}
            <code class='bg-gray-100 px-2 py-1 rounded text-sm'>
              after
            </code>{' '}
            property:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`const machine = createMachine({
  initial: 'waiting',
  states: {
    waiting: {
      // Transition after 3 seconds
      after: {
        3000: '/timeout',
      },
      on: {
        PROCEED: '/active',
      },
    },
    active: {
      on: {
        DONE: '/complete',
      },
    },
    timeout: {
      on: {
        RETRY: '/waiting',
      },
    },
    complete: {
      type: 'final',
    },
  },
});`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Event Types
          </h2>
          <p class='text-gray-700 mb-4'>
            Define type-safe events using TypeScript:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`type FormEvents =
  | { type: 'SUBMIT' }
  | { type: 'UPDATE_FIELD'; field: string; value: string }
  | { type: 'RESET' }
  | { type: 'VALIDATE'; fields: string[] };

// Events are type-checked and ONLY sent by interpreter
const service = interpret(formMachine, { context: {} });
service.send({ type: 'UPDATE_FIELD', field: 'email', value: 'test@example.com' });
service.send({ type: 'VALIDATE', fields: ['email', 'password'] });`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Best Practices
          </h2>
          <ul class='list-disc list-inside space-y-2 text-gray-700'>
            <li>
              Use descriptive, action-oriented event names (e.g.,
              SUBMIT_FORM, not BUTTON_CLICK)
            </li>
            <li>
              Keep event payloads minimal - include only necessary data
            </li>
            <li>Define event types using TypeScript for type safety</li>
            <li>
              Use uppercase with underscores for event type names (e.g.,
              USER_LOGOUT)
            </li>
            <li>
              Group related events with common prefixes (e.g., FORM_*)
            </li>
            <li>
              Avoid using generic event names like UPDATE or CHANGE - be
              specific
            </li>
          </ul>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Learn More
          </h2>
          <ul class='list-disc list-inside space-y-2 text-gray-700'>
            <li>
              <a
                href='/docs/concepts/actions'
                class='text-blue-600 hover:underline'
              >
                Actions
              </a>{' '}
              - Execute side effects in response to events
            </li>
            <li>
              <a
                href='/docs/concepts/guards'
                class='text-blue-600 hover:underline'
              >
                Guards
              </a>{' '}
              - Add conditions to event handlers
            </li>
            <li>
              <a
                href='/docs/api/interpreter'
                class='text-blue-600 hover:underline'
              >
                Interpreter API
              </a>{' '}
              - Full API reference for sending events
            </li>
          </ul>
        </section>
      </div>
    );
  },
});

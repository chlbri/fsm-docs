import { createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/docs/concepts/actions')({
  component: () => {
    return (
      <div class='prose max-w-none'>
        <h1 class='text-4xl font-bold text-gray-900 mb-4'>Actions</h1>

        <p class='text-lg text-gray-700 mb-6'>
          Actions are side effects that occur during state transitions.
          They can update context, call external APIs, or perform any other
          operation.
        </p>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            What are Actions?
          </h2>
          <p class='text-gray-700 mb-4'>
            Actions are functions that execute during transitions or when
            entering/exiting states. They have access to the current
            context and event data, and can modify the context.
          </p>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Defining Actions
          </h2>
          <p class='text-gray-700 mb-4'>
            Actions are referenced by name in your machine configuration
            and implemented using the{' '}
            <code class='bg-gray-100 px-2 py-1 rounded text-sm'>
              provideOptions
            </code>{' '}
            or{' '}
            <code class='bg-gray-100 px-2 py-1 rounded text-sm'>
              addOptions
            </code>{' '}
            methods:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`import { createMachine } from '@bemedev/app-ts';

const machine = createMachine({
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
}).provideOptions(({ assign }) => ({
  actions: {
    incrementCount: assign('context.count', ({ context }) => context.count + 1),
    decrementCount: assign('context.count', ({ context }) => context.count - 1),
  },
}));`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Entry and Exit Actions
          </h2>
          <p class='text-gray-700 mb-4'>
            Execute actions when entering or exiting a state:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`const machine = createMachine({
  initial: 'idle',
  states: {
    idle: {
      entry: 'logEntry',
      exit: 'logExit',
      on: {
        START: 'running',
      },
    },
    running: {
      entry: ['startTimer', 'notifyUser'],
      exit: 'stopTimer',
      on: {
        STOP: 'idle',
      },
    },
  },
}).provideOptions(({ voidAction, assign }) => ({
  actions: {
    logEntry: voidAction(() => console.log('Entering idle')),
    logExit: voidAction(() => console.log('Exiting idle')),
    startTimer: assign('context.startTime', () => Date.now()),
    notifyUser: voidAction(() => console.log('Started!')),
    stopTimer: assign('context.elapsed', ({ context }) => 
      Date.now() - context.startTime
    ),
  },
}));`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Multiple Actions with Batch
          </h2>
          <p class='text-gray-700 mb-4'>
            Execute multiple actions in sequence using the{' '}
            <code class='bg-gray-100 px-2 py-1 rounded text-sm'>
              batch
            </code>{' '}
            helper:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`const machine = createMachine({
  initial: 'idle',
  states: {
    idle: {
      on: {
        SUBMIT: {
          target: 'loading',
          actions: 'handleSubmit',
        },
      },
    },
    loading: {
      on: {
        SUCCESS: 'success',
        ERROR: 'error',
      },
    },
    success: {},
    error: {},
  },
}).provideOptions(({ batch, voidAction, assign }) => ({
  actions: {
    validateInput: voidAction(() => console.log('Validating...')),
    logSubmit: voidAction(() => console.log('Submitting...')),
    sendRequest: voidAction(() => console.log('Sending request...')),
    // Combine multiple actions
    handleSubmit: batch('validateInput', 'logSubmit', 'sendRequest'),
  },
}));`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Using Assign for Context Updates
          </h2>
          <p class='text-gray-700 mb-4'>
            The{' '}
            <code class='bg-gray-100 px-2 py-1 rounded text-sm'>
              assign
            </code>{' '}
            helper is the primary way to update context:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`machine.provideOptions(({ assign }) => ({
  actions: {
    // Update a single property
    increment: assign('context.count', ({ context }) => context.count + 1),
    
    // Update with event data
    addValue: assign('context.count', ({ context, event }) => 
      context.count + event.value
    ),
    
    // Update entire context
    reset: assign('context', () => ({
      count: 0,
      history: [],
    })),
    
    // Update nested properties
    setUserName: assign('context.user.name', ({ event }) => event.name),
  },
}));`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Side Effect Actions with voidAction
          </h2>
          <p class='text-gray-700 mb-4'>
            Use{' '}
            <code class='bg-gray-100 px-2 py-1 rounded text-sm'>
              voidAction
            </code>{' '}
            for side effects that don't modify context:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`machine.provideOptions(({ voidAction }) => ({
  actions: {
    logState: voidAction(({ event }) => {
      console.log('State transition:', event.type);
    }),
    
    notifyUser: voidAction(() => {
      alert('Operation completed!');
    }),
    
    sendAnalytics: voidAction(({ context, event }) => {
      analytics.track(event.type, { context });
    }),
  },
}));`}</code>
            </pre>
          </div>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            addOptions vs provideOptions
          </h2>
          <p class='text-gray-700 mb-4'>
            <strong>provideOptions</strong> returns a new instance
            (immutable), while <strong>addOptions</strong> mutates the
            current instance:
          </p>
          <div class='bg-gray-900 text-gray-100 p-4 rounded-lg'>
            <pre class='text-sm'>
              <code>{`// provideOptions: Returns NEW instance
const machine2 = machine1.provideOptions(({ assign }) => ({
  actions: {
    newAction: assign('context.value', () => 42),
  },
}));
// machine1 and machine2 are different instances

// addOptions: Mutates CURRENT instance
machine1.addOptions(({ assign }) => ({
  actions: {
    newAction: assign('context.value', () => 42),
  },
}));
// machine1 is modified

// Works with interpret too!
const service = interpret(machine, { context: { value: 0 } });
service.addOptions(({ assign }) => ({
  actions: {
    setValue: assign('context.value', ({ event }) => event.value),
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
            <li>Keep actions pure when possible - avoid side effects</li>
            <li>
              Use descriptive action names that indicate what they do
            </li>
            <li>
              Always return a new context object - don't mutate the
              existing one
            </li>
            <li>
              Group related actions together (e.g., logging actions, API
              actions)
            </li>
            <li>
              Handle errors within actions rather than letting them
              propagate
            </li>
            <li>Use TypeScript to type your context and events</li>
          </ul>
        </section>

        <section class='mb-8'>
          <h2 class='text-2xl font-semibold text-gray-900 mb-3'>
            Learn More
          </h2>
          <ul class='list-disc list-inside space-y-2 text-gray-700'>
            <li>
              <a
                href='/docs/concepts/context'
                class='text-blue-600 hover:underline'
              >
                Context
              </a>{' '}
              - Managing state data
            </li>
            <li>
              <a
                href='/docs/concepts/guards'
                class='text-blue-600 hover:underline'
              >
                Guards
              </a>{' '}
              - Conditional transitions
            </li>
            <li>
              <a
                href='/docs/examples/form-validation'
                class='text-blue-600 hover:underline'
              >
                Form Validation Example
              </a>{' '}
              - See actions in practice
            </li>
          </ul>
        </section>
      </div>
    );
  },
});
